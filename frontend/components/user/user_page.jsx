var React = require("react");
var SessionStore = require("../../stores/session_store");
var UserStore = require("../../stores/user_store");
var UserActions = require("../../actions/user_actions");
var UserSidebar = require("./user_sidebar/user_sidebar");
var UserNav = require("./user_nav");

var UserPage = React.createClass({
  getInitialState: function () {
    return this.getStatesFromStore();
  },

  getStatesFromStore: function () {
    var username = this.props.params.username;

    return {
      user: UserStore.getUser(),
      currentUser: SessionStore.getCurrentUser(),
      isCurrentUser: SessionStore.isCurrentUser(username)
    };
  },

  componentWillMount: function () {
    UserActions.fetchUser(this.props.params.username);
  },

  componentDidMount: function () {
    this.listenerToken = UserStore.addListener(this._onChange);
  },

  componentWillReceiveProps: function (nextProps) {
    UserActions.fetchUser(nextProps.params.username);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getStatesFromStore());
  },

  render: function () {
    return (
      <div className="container">
        <div className="row">
          <UserSidebar user={ this.state.user }
            currentUser={ this.state.currentUser }
            isCurrentUser={ this.state.isCurrentUser } />

          <div className="col-xs-8">
            <UserNav pathname={ this.props.location.pathname }
              history={ this.props.history }
              username={ this.props.params.username } />

            <div className="row">
              { this.props.children }
            </div>

          </div>
        </div>
      </div>
    );
  }
});

module.exports = UserPage;
