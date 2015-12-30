class Api::UsersController < ApplicationController
  before_action :prevent_if_logged_in, only: :create
  before_action :prevent_if_username_exists, only: :create
  before_action :require_login, only: :update

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render :created
    else
      render json: { errors: @user.errors.full_messages }
    end
  end

  def update
    @user = User.find_by(id: params[:id])

    if @user.update(user_params)
      render :updated
    else
      render json: { errors: @user.errors.full_messages }
    end
  end

  def show
    @user = User.friendly.find(params[:id])

    return not_found if @user.nil?

    render :show
  end

  private

  def user_params
    permitted = [:username, :email, :description, :password, :avatar]

    params.require(:user).permit(permitted)
  end

  def prevent_if_username_exists
    if user_exists?
      username_not_available
      false
    end
  end

  def user_exists?
    User.exists?(username: params[:user][:username])
  end

  def username_not_available
    render json: { errors: ["Username is not available"] }
  end
end
