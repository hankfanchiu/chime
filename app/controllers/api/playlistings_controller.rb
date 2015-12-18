class Api::PlaylistingsController < ApplicationController
  before_action :require_login
  before_action :require_user, only: [:destroy]

  def create
    @playlisting = Playlisting.new(playlisting_params)

    if @playlisting.save
      render json: @playlisting
    else
      render json: { errors: @playlisting.errors.full_messages }
    end
  end

  def destroy
    @playlisting = Playlisting.find_by(
      playlist_id: params[:playlist_id],
      track_id: params[:track_id]
    )

    if @playlisting.destroy
      render json: @playlisting
    else
      render json: { errors: @playlisting.errors.full_messages }
    end
  end

  private

  def playlisting_params
    params.require(:playlisting).permit(:playlist_id, :track_id)
  end

  def require_user
    own_playlisting = current_user.playlistings
      .where(playlist_id: params[:playlist_id], track_id: params[:track_id])

    unless own_playlisting
      render json: { errors: ["You do not own this playlisting!"] }
    end
  end
end
