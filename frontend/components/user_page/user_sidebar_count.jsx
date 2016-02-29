var React = require("react");

module.exports = React.createClass({
  render: function () {
    var items = this.props.items;
    var count = (items ? Object.keys(items).length : 0);

    return (
      <div className="user-asset">
        <h4 className="grey-heading">
          { this.props.title }: { count }
        </h4>
      </div>
    );
  }
});
