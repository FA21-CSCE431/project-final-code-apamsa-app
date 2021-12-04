# frozen_string_literal: true

Rails.application.routes.draw do
  root to: 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :users, param: :google_id
      resources :events, param: :slug
      resources :rsvps
      resources :blog_posts, param: :slug
      resources :comments
    end
  end

  match '*path', to: 'pages#index', via: :all
end
