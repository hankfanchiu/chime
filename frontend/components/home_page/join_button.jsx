var React = require("react");
var SessionActions = require("../../actions/session_actions");

module.exports = React.createClass({
  signUp: function () {
    SessionActions.showSignUpModal();
  },

  render: function () {
    return (
      <section className={ this.props.name }>
        <a className={ this.props.name } onClick={ this.signUp }>
          { this.props.children }
        </a>
      </section>
    );
  }
});
