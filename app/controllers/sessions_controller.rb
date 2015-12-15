class SessionsController < ApplicationController
  def create
    email, password = params[:user][:email], params[:user][:password]
    user = User.find_by_credentials(email, password)

    if user
      login!(user)
      render :login
    else
      render json: { error: "Invalid username or password" }
    end
  end

  def destroy
    logout!
    render json: {}
  end
end
