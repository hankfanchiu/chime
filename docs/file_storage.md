# File Storage on S3

Audio and image files are stored on Amazon Simple Storage Services (S3).

The two file types follow separate implementations - direct upload and pass-through upload.

Due to the large file sizes, audio files are uploaded directly to S3. Meanwhile, images are uploaded through Rails and processed by Paperclip. Using the AWS SDK, Paperclip uploads the image files to the appropriate S3 bucket.

## Direct Upload

For uploading potentially large audio files, a direct uploading process to Amazon Simple Storage Service (S3) is necessary. This is to avoid request timeouts during upload, a limitation of Rails on Heroku.

Upon selecting an audio file, the client initiates a direct upload.

First, the frontend application requests for a presigned URL and a public URL from the server. The presigned URL is for making the POST request to the appropriate and authorized S3 bucket. The public URL is eventually stored in the database as the track's audio URL.

In the backend, Rails fetches for these URLs through the AWS SDK.

When the signed URLs are received, the client automatically makes a second request, this time to S3. Included in the request is the audio file. The traditional XMLHttpRequest API is used for this process.

The uploading process is monitored and reflected in the UI.

After the upload finishes successfully, the client--still storing the public URL from the server--allows the user to submit the new track.

## Pass-Through Upload

For image files that, on average, are less than 5MB, a pass-through upload is sufficient.

On submit of a new track, or a user or track update, the image file is included as form data in a POST/PATCH request to the server. The Paperclip gem does its magic with the AWS SDK, and posts the image file to S3.

## Environments

While the release of Chime did not follow a full web development cycle, the file storage is separated into two buckets -- development and production.

Some configuration was necessary to set the appropriate environment variables for the AWS credentials, which are utilized by Paperclip to interact with S3.
