class Api::PlaylistingsController < ApplicationController
  before_action :require_login
  before_action :require_owner, only: [:destroy]

  def create
    @playlisting = Playlisting.new(playlisting_params)

    if @playlisting.save
      render json: @playlisting
    else
      render json: { errors: @playlisting.errors.full_messages }
    end
  end

  def remove
    @playlisting = Playlisting.find_by(playlisting_params)

    if @playlisting.nil?
      render json: {}, status: 404
    elsif @playlisting.destroy
      render json: @playlisting
    else
      render json: { errors: @playlisting.errors.full_messages }
    end
  end

  private

  def playlisting_params
    params.require(:playlisting).permit(:playlist_id, :track_id)
  end

  def require_owner
    owned_playlisting = current_user.playlistings
      .where(playlist_id: params[:playlist_id], track_id: params[:track_id])

    render json: {}, status: 403 unless own_playlisting
  end
end
