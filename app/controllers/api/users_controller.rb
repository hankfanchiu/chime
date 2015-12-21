class Api::UsersController < ApplicationController
  before_action :prevent_if_logged_in, only: :create
  before_action :require_login, only: :update

  def create
    if User.friendly.find(params[:user][:username])
      render json: { errors: ["Username is not available"] }
      return
    end

    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render "api/sessions/login"
    else
      render json: { errors: @user.errors.full_messages }
    end
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
      render :show
    else
      render json: { errors: @user.errors.full_messages }
    end
  end

  def show
    user_identification = params[:id].to_s.downcase
    @user = User.includes(:tracks).friendly.find(user_identification)

    if @user.nil?
      not_found
    else
      render :show
    end
  end

  private

  def user_params
    attributes = [:username, :email, :password, :password_confirmation]
    params.require(:user).permit(*attributes)
  end
end
