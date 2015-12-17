class UsersController < ApplicationController
  before_action :prevent_if_logged_in, only: [:create]

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
    @user = User.find(params[:id])
    @playlists = @user.playlists.includes(:tracks)

    render :show
  end

  private

  def user_params
    attributes = [:username, :email, :password, :password_confirmation]
    params.require(:user).permit(*attributes)
  end
end
