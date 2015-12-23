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
      render :show
    else
      render json: { errors: @playlist.errors.full_messages }
    end
  end

  def update
    @playlist = Playlist.find_by(id: params[:id])

    return not_found if @playlist.nil?

    if @playlist.update(playlist_params)
      render :show
    else
      render json: { errors: @playlist.errors.full_messages }
    end
  end

  def show
    @playlist = Playlist.find_by(id: params[:id])

    return not_found if @playlist.nil?

    render :show
  end

  def destroy
    @playlist = Playlist.find(params[:id])

    return not_found if @playlist.nil?

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
    playlist_owned = current_user.playlists.exists?(id: params[:id])

    forbidden unless playlist_owned
  end
end
