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
      render :created
    else
      render json: { errors: @playlist.errors.full_messages }
    end
  end

  def update
    @playlist = Playlist.find_by(id: params[:id])

    return not_found if @playlist.nil?

    @old_slug = @playlist.slug

    if @playlist.update(playlist_params)
      render :updated
    else
      render json: { errors: @playlist.errors.full_messages }
    end
  end

  def show
    username, slug = params[:username], params[:id]
    @playlist = Playlist.find_by_username_and_slug(username, slug)

    return not_found if @playlist.nil?

    render :show
  end

  def destroy
    @playlist = Playlist.find_by(id: params[:id])

    return not_found if @playlist.nil?

    if @playlist.destroy
      render :destroyed
    else
      render json: { errors: @playlist.errors.full_messages }
    end
  end

  private

  def playlist_params
    permitted = [:title, :description, { track_ids: [] }]
    params.require(:playlist).permit(permitted)
  end

  def require_owner
    playlist_owned = current_user.playlists.exists?(id: params[:id])

    forbidden unless playlist_owned
  end
end
