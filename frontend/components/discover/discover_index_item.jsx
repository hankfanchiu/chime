var React = require("react");

var Discover = React.createClass({
  _mouseDown: function (e) {
    var $box = $(e.currentTarget);
    $box.addClass("mousedown");
  },

  _mouseUp: function (e) {
    var $box = $(e.currentTarget);
    $box.removeClass("mousedown");
  },

  render: function () {
    return (
      <div className="col-xs-3 discover-index-item">
        <div className="box"
          onMouseDown={ this._mouseDown }
          onMouseUp={ this._mouseUp }>

          <div className="image">
            <img src="/assets/corgi.jpg" />
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
