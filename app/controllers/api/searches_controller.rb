class Api::SearchesController < ApplicationController
  before_action :require_query

  def show
    @users = User.search(params[:q])
    @tracks = Track.search(params[:q])

    render :show
  end

  private

  def require_query
    not_found unless params[:q]
  end
end
