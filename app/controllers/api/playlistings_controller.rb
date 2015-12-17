class Api::PlaylistingsController < ApplicationController
  def create
    @playlisting = Playlisting.new(playlisting_params)

    if @playlisting.save

    else
      render json: { errors: @playlisting.errors.full_messages }
    end
  end

  def destroy
    playlist_id = params[:playlist_id]
    track_id = params[:track_id]

    @playlisting = Playlisting.find_by(
      playlist_id: playlist_id,
      track_id: track_id
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
end
