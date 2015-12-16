class Api::TracksController < ApplicationController
  before_action :require_login, except: [:index, :show]
  before_action :require_arist, only: [:update, :destroy]

  def index
    @tracks = Track.all.includes(:user)
    render :index
  end

  def create
    @track = current_user.tracks.new(track_params)

    if @track.save
      render json: { success: ["Track created"] }
    else
      render json: { errors: @track.errors.full_messages }
    end
  end

  def update
    @track = Track.find(params[:id])

    if @track.update(track_params)
      render json: { success: ["Track updated"] }
    else
      render json: { errors: @track.errors.full_messages }
    end
  end

  def show
    @track = Track.find(params[:id]).includes(:user)
    render :show
  end

  def destroy
    @track = Track.find(params[:id])

    if @track.destroy
      render json: { success: ["Track deleted"] }
    else
      render json: { errors: @track.errors.full_messages }
    end
  end

  private

  def track_params
    params.require(:track).permit(:title, :description)
  end

  def require_artist
    own_track = current_user.tracks.find(params[:id])
    render json: { errors: ["You do not own this track!"] } unless own_track
  end
end
