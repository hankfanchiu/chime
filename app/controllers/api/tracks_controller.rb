class Api::TracksController < ApplicationController
  before_action :require_login, only: [:create, :update, :destroy]
  before_action :require_owner, only: [:update, :destroy]
  before_action :set_s3_direct_post, only: [:create, :update]

  def index
    @tracks = Track.all.includes(:user)

    render :index
  end

  def create
    @track = current_user.tracks.new(track_params)

    if @track.save
      render :show
    else
      render json: { errors: @track.errors.full_messages }
    end
  end

  def update
    @track = Track.friendly.find(params[:id])

    if @track.nil?
      not_found
    elsif @track.update(track_params)
      render json: @track
    else
      render json: { errors: @track.errors.full_messages }
    end
  end

  def show
    username, slug = params[:username], params[:id]
    @track = Track.find_by_username_and_slug(username, slug)

    if @track.nil?
      not_found
    else
      render :show
    end
  end

  def destroy
    @track = Track.friendly.find(params[:id])

    if @track.nil?
      not_found
    elsif @track.destroy
      render json: { success: ["Track deleted"] }
    else
      render json: { errors: @track.errors.full_messages }
    end
  end

  private

  def track_params
    params.require(:track).permit(:title, :description, :track_url)
  end

  def require_owner
    track_owned = current_user.tracks.exists?(id: params[:id])

    forbidden unless track_owned
  end

  def set_s3_direct_post
    @s3_direct_post = S3_BUCKET.presigned_post(
      key: "uploads/#{SecureRandom.uuid}/${filename}",
      success_action_status: '201',
      acl: 'public-read'
    )
  end
end
