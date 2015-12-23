var React = require("react");
var UserStore = require("../../../stores/user_store");
var UserPageNav = require("../user_page_nav");
var Sidebar = require("../sidebar/sidebar");

var ProfileIndex = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return { user: UserStore.getUser() };
  },

  componentDidMount: function () {
    this.listenerToken = UserStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  render: function () {
    return (
      <div className="row">

        <Sidebar user={ this.state.user } />

        <div className="col-sm-8">
          <UserPageNav pathname={ this.props.location.pathname }
            history={ this.props.history }
            username={ this.state.user.username } />

          <div className="row">
            <div className="profile-index clear">
              Detailed profile information about { this.state.user.username }.
            </div>
          </div>

        </div>
      </div>
    );
  }
});

module.exports = ProfileIndex;
