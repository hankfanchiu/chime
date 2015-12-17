class UsersController < ApplicationController
  before_action :prevent_if_logged_in, only: [:create]
  before_action :require_login, only: [:show]

  def create
    if User.find_by(username: params[:user][:username])
      render json: { errors: ["Username is not available"] }
      return
    end

    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render "/sessions/login"
    else
      render json: { errors: @user.errors.full_messages }
    end
  end

  def show
    @user = current_user
    @playlists = current_user.playlists.includes(:tracks)

    render :show
  end

  private

  def user_params
    attributes = [:username, :email, :password, :password_confirmation]
    params.require(:user).permit(*attributes)
  end
end
