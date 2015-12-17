Rails.application.routes.draw do
  root to: "pages#root"

  resource :session,
    only: [:create, :destroy],
    defaults: { format: :json }

  resources :users,
    only: [:create, :show, :update],
    defaults: { format: :json }

  patch "profile/update", to: "users#update", defaults: { format: :json }
  get "profile/fetch", to: "users#fetch", defaults: { format: :json }

  namespace :api, defaults: { format: :json } do
    resources :tracks, except: [:new, :edit]
    resources :playlists, except: [:new, :edit]
  end
end
