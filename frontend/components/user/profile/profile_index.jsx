var React = require("react");
var UserStore = require("../../../stores/user_store");
var UserPageNav = require("../user_page_nav");

var ProfileIndex = React.createClass({
  getInitialState: function () {
    return { user: UserStore.getUser() };
  },

  componentDidMount: function () {
    this.listenerToken = UserStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState({ user: UserStore.getUser() });
  },

  render: function () {
    return (
      <div className="row">

        <div className="col-xs-4">
          User information goes here
        </div>

        <div className="col-xs-8">
          <UserPageNav pathname={ this.props.location.pathname }
            history={ this.props.history }
            user={ this.props.params.user } />

          <div className="row">
            <div className="profile-index clear">
              Detailed profile information about the user.

              Email: { this.state.user.email }
            </div>
          </div>

        </div>
      </div>
    );
  }
});

module.exports = ProfileIndex;
