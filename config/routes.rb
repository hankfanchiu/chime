Rails.application.routes.draw do
  root to: "pages#root"

  resources :users, only: [:create, :show, :update], defaults: { format: :json }
  get "fetch/profile", to: "users#fetch", defaults: { format: :json }

  resource :session,
    only: [:create, :destroy],
    defaults: { format: :json }

  namespace :api, defaults: { format: :json } do
    resources :tracks, except: [:new, :edit]
    resources :playlists, except: [:new, :edit]
  end
end
