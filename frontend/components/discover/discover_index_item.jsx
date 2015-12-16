var React = require("react");

var Discover = React.createClass({
  _addClass: function (e) {
    var $box = $(e.currentTarget);
    $box.addClass("mousedown");
  },

  _removeClass: function (e) {
    var $box = $(e.currentTarget);
    $box.removeClass("mousedown");
  },

  render: function () {
    return (
      <div className="discover-index-item">
        <div className="box"
          onMouseDown={ this._addClass }
          onMouseUp={ this._removeClass }
          onMouseOut={ this._removeClass }>

          <div className="image">
            <img src={ this.props.track.img_url } />
          </div>

          <div className="title">
            { this.props.track.title }
          </div>

        </div>
      </div>
    );
  }
});

module.exports = Discover;
