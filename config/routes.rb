Rails.application.routes.draw do
  root to: "pages#root"

  resource :users, only: [:create, :show]
  resource :session, only: [:create, :destroy]
end
