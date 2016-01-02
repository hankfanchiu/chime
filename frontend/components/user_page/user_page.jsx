var React = require("react");
var Grid = require("react-bootstrap").Grid;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Nav = require("react-bootstrap").Nav;
var NavItem = require("react-bootstrap").NavItem;
var SessionStore = require("../../stores/session_store");
var UserStore = require("../../stores/user_store");
var UserActions = require("../../actions/user_actions");
var TrackStore = require("../../stores/track_store");
var PlaylistStore = require("../../stores/playlist_store");
var UserSidebar = require("./user_sidebar");

var UserPage = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    var username = this.props.params.username;

    return {
      user: UserStore.find(username),
      tracks: TrackStore.getTracksByUsername(username),
      playlists: PlaylistStore.getPlaylistsByUsername(username),
      client: SessionStore.getClient(),
      isClient: SessionStore.isClient(username)
    };
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(this._onChange);
    this.sessionListener = SessionStore.addListener(this._onChange);
    this.trackListener = TrackStore.addListener(this._onChange);
    this.playlistListener = PlaylistStore.addListener(this._onChange);

    UserActions.fetchUser(this.props.params.username);
  },

  componentWillReceiveProps: function (nextProps) {
    var nextUser = nextProps.params.username;
    var sameUser = (this.props.params.username === nextUser);

    if (!sameUser) {
      UserActions.fetchUser(nextUser);
    }
  },

  componentWillUnmount: function () {
    this.userListener.remove();
    this.sessionListener.remove();
    this.trackListener.remove();
    this.playlistListener.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  _handleSelect: function (selectKey) {
    this.props.history.pushState(null, selectKey);
  },

  render: function () {
    var username = this.props.params.username;
    var trackPathname = "/" + username + "/tracks";
    var playlistPathname = "/" + username + "/playlists";

    return (
      <main>
        <Grid>
          <Row>
            <UserSidebar user={ this.state.user }
              tracks={ this.state.tracks }
              playlists={ this.state.playlists }
              client={ this.state.client }
              isClient={ this.state.isClient } />

            <Col xs={ 9 } sm={ 9 } md={ 9 }>
              <Nav bsStyle="tabs"
                activeKey={ this.props.location.pathname }
                onSelect={ this._handleSelect }>

                <NavItem eventKey={ trackPathname }>
                  <h4 className="user-page-nav">Tracks</h4>
                </NavItem>

                <NavItem eventKey={ playlistPathname }>
                  <h4 className="user-page-nav">Playlists</h4>
                </NavItem>
              </Nav>

              { this.props.children }
            </Col>
          </Row>
        </Grid>
      </main>
    );
  }
});

module.exports = UserPage;
