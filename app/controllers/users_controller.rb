class UsersController < ApplicationController
  before_action :prevent_if_logged_in, only: [:create]
  before_action :require_login, only: [:show]

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)

      render "/sessions/login"
    else
      render json: { errors: @user.errors.full_messages }
    end
  end

  def show
    render json: { user: current_user.email }
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
