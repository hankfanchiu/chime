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

  def delete
    @playlisting = Playlisting.find_by(playlisting_params)

    if @playlisting.nil?
      not_found
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
    playlisting_owned = current_user.playlistings.exists?(
      playlist_id: params[:playlist_id],
      track_id: params[:track_id]
    )

    forbidden unless playlisting_owned
  end
end
