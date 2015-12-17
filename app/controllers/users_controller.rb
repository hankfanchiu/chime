class UsersController < ApplicationController
  before_action :prevent_if_logged_in, only: [:create]
  before_action :require_login, only: [:fetch, :update]

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

  def fetch
    @user = current_user
    @playlists = @user.playlists

    render :fetch
  end

  def fetch_playlists
    @playlists = current_user.playlists

    render "api/playlists/index"
  end

  def update
    username = current_user.username
    password = user_params[:password]

    @user = User.find_by_credentials(username, password)

    if @user.nil?
      render json: { errors: ["Incorrect password"] }
      return
    end

    if @user.update(user_params.except(:password))
      render :fetch
    else
      render json: { errors: @user.errors.full_messages }
    end
  end

  def show
    @user = User.find(params[:id])
    @playlists = @user.playlists

    render :show
  end

  private

  def user_params
    attributes = [:username, :email, :password, :password_confirmation]
    params.require(:user).permit(*attributes)
  end
end
