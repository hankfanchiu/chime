Rails.application.routes.draw do
  root to: "pages#root"

  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy]

    resources :users, only: [:create, :show, :update]

    resources :tracks, except: [:new, :edit]

    resources :playlists, except: [:new, :edit]

    resources :playlistings, only: [:create]
    post "remove_track_from_playlist", to: "playlistings#delete"
  end

  get "*path", to: "pages#root"
end
