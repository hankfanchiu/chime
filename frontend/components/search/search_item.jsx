var React = require("react");
var Image = require("react-bootstrap").Image;
var Glyphicon = require("react-bootstrap").Glyphicon;
var History = require("react-router").History;

module.exports = React.createClass({
  mixins: [History],

  goToPage: function () {
    this.history.pushState(null, this.props.pathname);
    this.props.clearQuery();
  },

  render: function () {
    return (
      <div className="search-option" onMouseDown={ this.goToPage }>
        <div className="search-option-image">
          <Image src={ this.props.imageUrl } className="search-option-image" />
        </div>

        <div className="search-option-name">
          { this.props.displayName }
        </div>

        <div className="search-option-type">
          <Glyphicon glyph={ this.props.glyph } />
        </div>
      </div>
    );
  }
});
