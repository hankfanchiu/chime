var React = require("react");
var LinkedStateMixin = require("react-addons-linked-state-mixin");

var UploadForm = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {
      title: "",
      description: ""
    }
  },

  _handleSubmit: function (e) {
    e.preventDefault();


  },

  render: function () {
    return (
      <form className="upload-form" encType="multipart/form-data"
        onSubmit={ this._handleSubmit }>

        <div className="form-group">
          <label htmlFor="upload-track-title">Title</label>

          <input type="text"
            name="title"
            className="form-control"
            id="upload-track-title"
            placeholder="Name your track"
            valueLink={ this.linkState("title") } />
        </div>

        <div className="form-group">
          <label htmlFor="upload-track-description">Description</label>

          <textarea name="description"
            className="form-control"
            id="upload-track-description"
            placeholder="Describe your track"
            valueLink={ this.linkState("description") } />
        </div>

        <button className="btn btn-default"
          type="submit">Save</button>
      </form>
    );
  }
});

module.exports = UploadForm;
