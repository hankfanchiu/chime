var React = require("react");
var Alert = require("react-bootstrap").Alert;

module.exports = React.createClass({
  errors: function () {
    var errors = this.props.errors;

    if (errors.length === 1) {
      return errors;
    }

    var errorList = errors.map(function (error, idx) {
      return <li key={ idx }>{ error }</li>;
    });

    return <ul>{ errorList }</ul>;
  },

  render: function () {
    return (
      <Alert bsStyle="danger">
        { this.errors() }
      </Alert>
    );
  }
});
