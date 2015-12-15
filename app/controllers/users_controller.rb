class UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)

      render "/sessions/login"
    else
      render json: { error: @user.errors.full_messages }
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
