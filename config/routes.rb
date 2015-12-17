Rails.application.routes.draw do
  root to: "pages#root"

  resource :session,
    only: [:create, :destroy],
    defaults: { format: :json }

  resources :users,
    only: [:create, :show, :update],
    defaults: { format: :json }

  get "profile/fetch_playlists", to: "users#fetch_playlists", defaults: { format: :json }

  namespace :api, defaults: { format: :json } do
    resources :tracks, except: [:new, :edit]
    resources :playlists, except: [:new, :edit]
    resource :playlistings, only: [:create, :destroy]
  end
end
