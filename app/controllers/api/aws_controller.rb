require "s3_presigner"

class Api::AwsController < ApplicationController
  before_action :require_prefix_and_filename

  def show
    prefix = params[:prefix] + "/"
    filename = params[:filename]
    limit = 10.megabyte
    presigner = S3Presigner.instance
    presigned_url = presigner.presign(prefix, filename, limit: limit)

    render json: presigned_url
  end

  private

  def require_prefix_and_filename
    not_found unless params[:prefix] && params[:filename]
  end
end
