Rails.application.routes.draw do
  root to: "static_pages#index"

  namespace :api, defaults: { format: :json } do
    resource :search, only: [:show]

    resource :session, only: [:create, :destroy]

    resources :users, only: [:create, :show, :update]

    resources :tracks, except: [:new, :edit]

    resources :playlists, except: [:new, :edit]

    resources :playlistings, only: [:create]
    post "remove_track_from_playlist", to: "playlistings#destroy"
  end

  get "*path", to: "static_pages#index"
end
