var React = require("react");
var Grid = require("react-bootstrap").Grid;
var PageHeader = require("react-bootstrap").PageHeader;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;

var Home = React.createClass({
  render: function () {
    return (
      <Grid>
        <PageHeader>
          See what's trending
        </PageHeader>
      </Grid>
    );
  }
});

module.exports = Home;
