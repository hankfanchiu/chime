class SessionsController < ApplicationController
  before_action :prevent_if_logged_in, only: [:create]
  before_action :require_login, only: [:destroy]

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user
      login!(@user)
      render :login
    else
      render json: { errors: ["Invalid username or password"] }
    end
  end

  def destroy
    logout!
    render json: {}
  end
end
