Rails.application.routes.draw do
  root "users#new"

  resources :users
  resources :events
  resources :rsvps

  get '/users', to: redirect('/events')

  devise_for :admins
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
