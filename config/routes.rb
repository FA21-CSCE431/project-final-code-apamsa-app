# frozen_string_literal: true

Rails.application.routes.draw do
  root 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :users, param: :email
      resources :events, param: :slug
      resources :rsvps, only: [:create, :destroy]
      resources :blog_posts
      resources :comments
    end
  end

  # root to: 'dashboards#show'

  # get 'pages' => "pages#index"
  match '*path', to: 'pages#index', via: :all

  devise_for :admins, controllers: { omniauth_callbacks: 'admins/omniauth_callbacks' }
  devise_scope :admin do
    get 'admins/sign_in', to: 'admins/sessions#new', as: :new_admin_session
    get 'admins/sign_out', to: 'admins/sessions#destroy', as: :destroy_admin_session
  end

end
