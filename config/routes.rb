Rails.application.routes.draw do

  root "pages#index"

  namespace :api do
    namespace :v1 do
      resources :users
      resources :events, param: :slug
      resources :rsvps, only: [:create, :destroy, :update]
    end
  end

  # Route requests that arent for existing paths back to our index path
  # this is to handle react router w/o interfering with our actual rails routes
  get '*path', to: 'pages#index', via: :all

end
