class Api::SearchesController < ApplicationController
  def show
    @user_matches = User.search(params[:q])
    @track_matches = Track.includes(:user).search(params[:q])

    render :show
  end
end
