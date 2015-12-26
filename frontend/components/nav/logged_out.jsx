var React = require("react");
var Nav = require("react-bootstrap").Nav;
var NavItem = require("react-bootstrap").NavItem;
var NavDropdown = require("react-bootstrap").NavDropdown;
var MenuItem = require("react-bootstrap").MenuItem;
var Button = require("react-bootstrap").Button;
var Image = require("react-bootstrap").Image;
var Glyphicon = require("react-bootstrap").Glyphicon;
var SignUpActions = require("../../actions/sign_up_actions");

var LoggedOut = React.createClass({
  _showSignUpModal: function () {
    SignUpActions.showModal();
  },

  _goToLogin: function () {
    this.props.pushState("/login");
  },

  render: function () {
    return (
      <Nav pullRight>
        <NavItem eventKey={ 1 } onSelect={ this._showSignUpModal }>
          Sign Up
        </NavItem>

        <NavItem eventKey={ 2 } onSelect={ this._goToLogin }>
          Login
        </NavItem>
      </Nav>
    );
  }
});

module.exports = LoggedOut;
