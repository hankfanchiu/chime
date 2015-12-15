class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user, :signed_in?

  def current_user
    return nil unless session[:token]
    @current_user ||= User.find_by(session_token: session[:token])
  end

  def signed_in?
    !!current_user
  end

  def sign_in!(user)
    @current_user = user
    session[:token] = user.reset_session_token!
  end

  def sign_out!
    current_user.try(:reset_session_token!)
    session[:token] = nil
  end
end
