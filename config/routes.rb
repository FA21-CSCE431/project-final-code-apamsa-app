Rails.application.routes.draw do

  root to: 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :users, param: :user_id
      resources :events, param: :slug
      resources :rsvps, only: [:create, :destroy]
      resources :blog_posts, param: :slug
      resources :comments
    end
  end

  match '*path', to: 'pages#index', via: :all

end
