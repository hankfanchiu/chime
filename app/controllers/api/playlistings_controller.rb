class Api::PlaylistingsController < ApplicationController
  before_action :require_login
  before_action :require_owner, only: :destroy

  def create
    @playlisting = Playlisting.new(playlisting_params)

    if @playlisting.save
      render :playlisting_created
    else
      render json: { errors: @playlisting.errors.full_messages }
    end
  end

  def destroy
    @playlisting = Playlisting.find_by(playlisting_params)

    return not_found if @playlisting.nil?

    if @playlisting.destroy
      render :playlisting_destroyed
    else
      render json: { errors: @playlisting.errors.full_messages }
    end
  end

  private

  def playlisting_params
    params.require(:playlisting).permit(:playlist_id, :track_id)
  end

  def require_owner
    playlist_id = playlisting_params[:playlist_id]
    track_id = playlisting_params[:track_id]

    playlisting_owned = current_user.playlistings
      .exists?(playlist_id: playlist_id, track_id: track_id)

    forbidden unless playlisting_owned
  end
end
