class SessionsController < ApplicationController
  def create
    user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if user
      sign_in!(user)
      render json: @user.username
    else
      render json: ["Incorrect username or password"]
    end
  end

  def destroy
    sign_out!
  end
end
