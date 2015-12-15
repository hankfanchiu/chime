class UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      sign_in!(@user)
      render json: @user.username
    else
      render json: @user.errors.full_messages
    end
  end

  def show
    @user = current_user
    render json: @user.username
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
