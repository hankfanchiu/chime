var React = require("react");
var Modal = require("react-bootstrap").Modal;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var ListGroup = require("react-bootstrap").ListGroup;
var ListGroupItem = require("react-bootstrap").ListGroupItem;
var Input = require("react-bootstrap").Input;
var Image = require("react-bootstrap").Image;
var Button = require("react-bootstrap").Button;
var PlaylistActions = require("../../actions/playlist_actions");
var PlaylistStore = require("../../stores/playlist_store");
var LinkedStateMixin = require("react-addons-linked-state-mixin");
var History = require("react-router").History;

var PlaylistForm = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return { title: "", description: "" };
  },

  componentDidMount: function () {
    this.listenerToken = PlaylistStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    var pathname = PlaylistStore.getNewPlaylistPathname();

    if (pathname) {
      this.setState(this.getInitialState);
      this.history.pushState(null, pathname);
    }
  },

  _disabled: function () {
    return this.state.title === "";
  },

  _handleSubmit: function (e) {
    e.preventDefault();
    this.createPlaylist();
  },

  _titleLabel: function () {
    return <span className="required-label">Title</span>;
  },

  createPlaylist: function () {
    var playlistData = {
      title: this.state.title,
      description: this.state.description,
      track_ids: [this.props.track.id]
    }

    PlaylistActions.createPlaylist(playlistData);
  },

  reset: function () {
    this.setState(this.getInitialState);
    this.props.close();
  },

  render: function () {
    return (
      <form onSubmit={ this._handleSubmit }>
        <Modal.Body>
          <Input type="text"
            label={ this._titleLabel() }
            placeholder="Name your new playlist"
            valueLink={ this.linkState("title") } />

          <Input type="textarea"
            label="Description"
            id="playlist-description"
            rows="5"
            placeholder="Describe your new playlist"
            valueLink={ this.linkState("description") } />

          <Input label="Added Track">
            <ListGroup>
              <ListGroupItem>
                <div className="playlist-form-track">
                  <div className="track-thumbnail">
                    <Image src={ this.props.track.img_thumb } thumbnail />
                  </div>

                  <section className="track-info">
                    <header>
                      <span className="username">
                        { this.props.track.user.username }
                      </span>
                    </header>

                    <header>
                      <span className="title">
                        { this.props.track.title }
                      </span>
                    </header>
                  </section>
                </div>
              </ListGroupItem>
            </ListGroup>
          </Input>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={ this.reset }>Cancel</Button>

          <Button bsStyle="primary"
            disabled={ this._disabled() }
            type="submit">
            Save
          </Button>
        </Modal.Footer>
      </form>
    );
  }
});

module.exports = PlaylistForm;
