var UploadAPIUtils = {
  fetchSignedUrls: function (prefix, file, callback) {
    var url = "/api/aws?prefix=" + prefix + "&filename=" + file.name;

    $.ajax({
      url: url,
      type: "GET",
      dataType: "json",
      cache: false,
      success: function (response) {
        callback(response, file);
      }
    });
  },

  directUploadToS3: function (presignedUrl, file, progressCb, successCb) {
    var xhr = new XMLHttpRequest();

    xhr.open('PUT', presignedUrl, true);
    xhr.setRequestHeader("Content-Type", file.type);

    xhr.upload.onprogress = function (e) {
      var percent = e.loaded / e.total;
      progressCb(percent);
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        successCb(xhr);
      }
    };

    xhr.send(file);
  }
};

module.exports = UploadAPIUtils;
