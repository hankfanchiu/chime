require "aws-sdk"
require "singleton"

class S3Presigner
  include Singleton

  def presign(prefix, filename, limit: limit)
    extension = File.extname(filename).downcase
    filename = "#{SecureRandom.uuid}#{extension}"
    upload_key = Pathname.new(prefix).join(filename).to_s

    creds = Aws::Credentials.new(
      ENV["AWS_ACCESS_KEY_ID"],
      ENV["AWS_SECRET_ACCESS_KEY"]
    )

    s3 = Aws::S3::Resource.new(region: "us-west-1", credentials: creds)
    bucket = s3.bucket(ENV["S3_BUCKET"])
    object = bucket.object(upload_key)

    params = { acl: "public-read" }
    params[:content_length] = limit if limit

    {
      presigned_url: object.presigned_url(:put, params),
      public_url: object.public_url
    }
  end
end
