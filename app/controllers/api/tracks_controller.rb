class Api::TracksController < ApplicationController
  before_action :require_login, only: [:create, :update, :destroy]
  before_action :require_owner, only: [:update, :destroy]

  def index
    if params[:user_id] == current_user.id
      @tracks = current_user.tracks.includes(:user)
    else
      @tracks = Track.all.includes(:user)
    end

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
    @track = Track.find(params[:id])

    if @track.nil?
      not_found
    elsif @track.update(track_params)
      render json: @track
    else
      render json: { errors: @track.errors.full_messages }
    end
  end

  def show
    @track = Track.find(params[:id])

    if @track.nil?
      not_found
    else
      render :show
    end
  end

  def destroy
    @track = Track.find(params[:id])

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
