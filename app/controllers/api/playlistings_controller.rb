class Api::PlaylistingsController < ApplicationController
  def create
    @playlisting = Playlisting.new(playlisting_params)

    if @playlisting.save
      render json: @playlisting
    else
      render json: { errors: @playlisting.errors.full_messages }
    end
  end

  private

  def playlisting_params
    params.require(:playlisting).permit(:playlist_id, :track_id)
  end
end
