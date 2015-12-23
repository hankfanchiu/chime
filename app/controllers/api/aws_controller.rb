require "s3_presigner"

class Api::AwsController < ApplicationController
  before_action :require_login
  before_action :require_prefix
  before_action :require_filename

  def show
    prefix = params[:prefix] + "/"
    filename = params[:filename]
    limit = 15.megabytes
    presigner = S3Presigner.instance

    signed_urls = presigner.presign(prefix, filename, limit: limit)

    render json: signed_urls
  end

  private

  def require_prefix
    not_found unless params[:prefix]
  end

  def require_filename
    not_found unless params[:filename]
  end
end
