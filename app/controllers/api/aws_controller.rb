require "s3_presigner"

class Api::AwsController < ApplicationController
  def create
    prefix = "audio/"
    filename = params[:filename]
    limit = 10.megabyte
    presigner = S3Presigner.instance
    presigned_url = presigner.presign(prefix, filename, limit: limit)

    render json: presigned_url
  end

  def show
    prefix = "audio/"
    filename = "test.mp3"
    limit = 10.megabyte
    presigner = S3Presigner.instance
    presigned_url = presigner.presign(prefix, filename, limit: limit)

    render json: presigned_url
  end
end
