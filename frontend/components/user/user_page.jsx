var React = require("react");
var Grid = require("react-bootstrap").Grid;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Nav = require("react-bootstrap").Nav;
var NavItem = require("react-bootstrap").NavItem;

var SessionStore = require("../../stores/session_store");
var UserStore = require("../../stores/user_store");
var UserActions = require("../../actions/user_actions");
var UserSidebar = require("./user_sidebar/user_sidebar");

var UserPage = React.createClass({
  getInitialState: function () {
    return this.getStatesFromStore();
  },

  getStatesFromStore: function () {
    var username = this.props.params.username;

    return {
      user: UserStore.getUser(username),
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

  _handleSelect: function (selectKey) {
    this.props.history.pushState(null, selectKey);
  },

  render: function () {
    var username = this.props.params.username;
    var profile = "/" + username;
    var tracks = "/" + username + "/tracks";
    var playlists = "/" + username + "/playlists";

    return (
      <Grid>
        <Row>
          <UserSidebar user={ this.state.user }
            currentUser={ this.state.currentUser }
            isCurrentUser={ this.state.isCurrentUser } />

          <Col xs={ 8 } sm={ 8 } md={ 8 }>
            <Nav bsStyle="tabs"
              activeKey={ this.props.location.pathname }
              onSelect={ this._handleSelect }>

              <NavItem eventKey={ profile } disabled>Profile</NavItem>

              <span className="spacer spacer-large" />

              <NavItem eventKey={ tracks }>Tracks</NavItem>

              <span className="spacer spacer-large" />

              <NavItem eventKey={ playlists }>Playlists</NavItem>
            </Nav>

            { this.props.children }
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = UserPage;
