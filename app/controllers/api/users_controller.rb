class Api::UsersController < ApplicationController
  before_action :prevent_if_logged_in, only: :create
  before_action :require_login, only: :update

  def create
    return render_username_unavailable if user_exists?

    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render :show
    else
      render json: { errors: @user.errors.full_messages }
    end
  end

  def update
    @user = User.find_by(id: params[:id])

    if @user.update(user_params.except(:password))
      render :show
    else
      render json: { errors: @user.errors.full_messages }
    end
  end

  def show
    @user = User.includes(:tracks).find_by(username: params[:id])

    return not_found if @user.nil?

    render :show
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :avatar)
  end

  def user_exists?
    User.friendly.exists?(params[:user][:username])
  end

  def render_username_unavailable
    render json: { errors: ["Username is not available"] }
  end
end
