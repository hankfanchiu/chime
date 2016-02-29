var React = require("react");
var Alert = require("react-bootstrap").Alert;

module.exports = React.createClass({
  content: function () {
    if (this.props.isGeneric) {
      return (
        "An error has occurred. Please refresh the page and try again."
      );
    } else {
      return this.errors();
    }
  },

  errors: function () {
    var errors = this.props.errors;
    var errorList;

    if (errors.length === 1) {
      return errors;
    } else {
      errorList = errors.map(function (error, idx) {
        return <li key={ idx }>{ error }</li>;
      });

      return <ul>{ errorList }</ul>;
    }
  },

  render: function () {
    if (this.props.errors.length === 0) { return null; }

    return (
      <Alert bsStyle="danger">
        { this.content() }
      </Alert>
    );
  }
});
