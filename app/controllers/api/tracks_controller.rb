class Api::TracksController < ApplicationController
  before_action :require_login, only: [:create, :update, :destroy]
  before_action :require_owner, only: [:update, :destroy]

  def index
    @tracks = Track.all.includes(:user)

    render :index
  end

  def create
    @track = current_user.tracks.new(track_params)

    if @track.save
      render json: @track
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
    params.require(:track).permit(:title, :description)
  end

  def require_owner
    track_owned = current_user.tracks.exists?(id: params[:id])

    forbidden unless track_owned
  end
end
