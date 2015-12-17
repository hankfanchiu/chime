Rails.application.routes.draw do
  root to: "pages#root"

  resources :users, only: [:create, :show], defaults: { format: :json }
  resource :session, only: [:create, :destroy], defaults: { format: :json }

  namespace :api, defaults: { format: :json } do
    resources :tracks, except: [:new, :edit]
    resources :playlists, except: [:new, :edit]
  end
end
