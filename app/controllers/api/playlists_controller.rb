class Api::PlaylistsController < ApplicationController
  before_action :require_login, only: [:create, :destroy]
  before_action :require_user, only: [:update, :destroy]

  def index
    @playlists = Playlist.all.includes(:tracks)
    render :index
  end

  def create
    @playlist = current_user.playlists.new(playlist_params)

    if @playlist.save
      render json: { success: ["Playlist created"] }
    else
      render json: { errors: @playlist.errors.full_messages }
    end
  end

  def update
    @playlist = Playlist.find(params[:id])

    if @playlist.update(playlist_params)
      render json: { success: ["Track updated"] }
    else
      render json: { errors: @playlist.errors.full_messages }
    end
  end

  def show
    @playlist = Playlist.find(params[:id])
    render :show
  end

  def destroy
    @playlist = Playlist.find(params[:id])

    if @playlist.destroy
      render json: { success: ["Playlist deleted"] }
    else
      render json: { errors: @playlist.errors.full_messages }
    end
  end

  private

  def playlist_params
    params.require(:playlist).permit(:title, :description, :tracks)
  end

  def require_user
    own_playlist = current_user.playlists.find(params[:id])

    unless own_playlist
      render json: { errors: ["You do not own this playlist!"] }
    end
  end
end
