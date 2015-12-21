var React = require("react");

var ErrorNotice = React.createClass({
  render: function () {
    var errors = this.props.errors.map(function (error, idx) {
      return <li key={ idx }>{ error }</li>;
    });

    return (
      <ul className="error-notice">
        { errors }
      </ul>
    );
  }
});

module.exports = ErrorNotice;
