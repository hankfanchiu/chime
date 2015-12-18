class Api::PlaylistsController < ApplicationController
  before_action :require_login, only: [:create, :destroy]
  before_action :require_owner, only: [:update, :destroy]

  def index
    @playlists = Playlist.all.includes(:tracks)
    render :index
  end

  def create
    @playlist = current_user.playlists.new(playlist_params)

    if @playlist.save
      render json: @playlist
    else
      render json: { errors: @playlist.errors.full_messages }
    end
  end

  def update
    @playlist = Playlist.find(params[:id])

    if @playlist.update(playlist_params)
      render json: @playlist
    else
      render json: { errors: @playlist.errors.full_messages }
    end
  end

  def show
    @playlist = Playlist.includes(:playlistings).find(params[:id])
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

  def require_owner
    owned_playlist = current_user.playlists.find(params[:id])

    render json: {}, status: 403 unless owned_playlist
  end
end
