class Api::SearchesController < ApplicationController
  before_action :require_query

  def show
    @user_matches = User.search(params[:q])
    @track_matches = Track.search(params[:q])

    render :show
  end

  private

  def require_query
    not_found unless params[:q]
  end
end
