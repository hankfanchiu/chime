var React = require("react");
var Nav = require("react-bootstrap").Nav;
var NavItem = require("react-bootstrap").NavItem;
var SessionActions = require("../../actions/session_actions");

var LoggedOut = React.createClass({
  render: function () {
    return (
      <Nav pullRight>
        <NavItem onSelect={ SessionActions.showSignUpModal }>
          Sign Up
        </NavItem>

        <NavItem onSelect={ SessionActions.showLoginModal }>
          Login
        </NavItem>
      </Nav>
    );
  }
});

module.exports = LoggedOut;
