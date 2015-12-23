class Api::SessionsController < ApplicationController
  before_action :prevent_if_logged_in, only: :create

  def create
    username, password = params[:user][:username], params[:user][:password]
    @user = User.find_by_credentials(username, password)

    if @user
      login!(@user)
      render "api/users/show"
    else
      render json: { errors: ["Invalid username or password"] }
    end
  end

  def destroy
    logout!
    render json: {}
  end
end
