class Api::SearchesController < ApplicationController
  def show
    @user_matches = User.find_by(username: params[:query])
    @track_matches = Track.find_by(title: params[:query])

    render :show
  end
end
