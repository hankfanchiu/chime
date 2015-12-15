Rails.application.routes.draw do
  root to: "pages#root"

  resource :users, only: [:create, :show], defaults: { format: :json }
  resource :session, only: [:create, :destroy], defaults: { format: :json }

  namespace :api, defaults: { format: :json } do

  end
end
