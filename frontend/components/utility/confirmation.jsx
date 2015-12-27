var React = require("react");
var Modal = require("react-bootstrap").Modal;
var Button = require("react-bootstrap").Button;

var Dialog = React.createClass({
  getDefaultProps: function () {
    return {
      header: "Are you sure?",
      cancelButton: "Cancel",
      confirmButton: "Confirm"
    };
  },

  render: function () {
    return (
      <Modal backdrop="static" bsSize="small" show={ this.props.show }>
        <Modal.Header>
          <Modal.Title>
            { this.props.header }
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          { this.props.children }
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={ this.props.cancel }>
            { this.props.cancelButton }
          </Button>

          <Button bsStyle="primary" onClick={ this.props.confirm }>
            { this.props.confirmButton }
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

module.exports = Dialog;
