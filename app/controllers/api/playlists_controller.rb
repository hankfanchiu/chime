class Api::PlaylistsController < ApplicationController
  before_action :require_login, only: [:create, :update, :destroy]
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

    if @playlist.nil?
      not_found
    elsif @playlist.update(playlist_params)
      render json: @playlist
    else
      render json: { errors: @playlist.errors.full_messages }
    end
  end

  def show
    @playlist = Playlist.find(params[:id])

    if @playlist.nil?
      not_found
    else
      render :show
    end
  end

  def destroy
    @playlist = Playlist.find(params[:id])

    if @playlist.nil?
      not_found
    elsif @playlist.destroy
      render json: @playlist
    else
      render json: { errors: @playlist.errors.full_messages }
    end
  end

  private

  def playlist_params
    params.require(:playlist).permit(:title, :description, :tracks)
  end

  def require_owner
    playlist_owned = current_user.playlists.exists?(id: params[:id])

    forbidden unless playlist_owned
  end
end
