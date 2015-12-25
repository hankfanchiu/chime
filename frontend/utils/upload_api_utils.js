var UploadAPIUtils = {
  fetchSignedUrls: function (prefix, file, actionCallback) {
    var url = "/api/aws?prefix=" + prefix + "&filename=" + file.name;

    $.ajax({
      url: url,
      type: "GET",
      dataType: "json",
      cache: false,
      success: function (response) {
        actionCallback(response, file);
      }
    });
  },

  directUploadToS3: function (presignedUrl, file, progressCB, successCB) {
    var xhr = new XMLHttpRequest();

    xhr.open('PUT', presignedUrl, true);
    xhr.setRequestHeader("Content-Type", file.type);

    xhr.upload.onprogress = function (e) {
      var percent = e.loaded / e.total;
      progressCB(percent);
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        successCB(xhr);
      }
    };

    xhr.send(file);
  }
};

module.exports = UploadAPIUtils;
