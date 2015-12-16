var React = require("react");

var DiscoverListItem = React.createClass({
  render: function () {
    return (
      <div className="discover-list-item clear">
        <div className="image">
          <img src={ this.props.track.img_url } />
        </div>

        <div className="detail">

          <p className="title">
            { this.props.track.title }
          </p>

          <p className="user">
            <a>{ this.props.track.user }</a>
          </p>

          <p>
            <a>Add to Playlist</a>
          </p>

        </div>
      </div>
    );
  }
});

module.exports = DiscoverListItem;
