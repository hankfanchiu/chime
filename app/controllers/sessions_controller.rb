class SessionsController < ApplicationController
  before_action :prevent_if_logged_in, only: [:create]
  before_action :require_login, only: [:destroy]

  def create
    email, password = params[:user][:email], params[:user][:password]
    user = User.find_by_credentials(email, password)

    if user
      login!(user)
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
