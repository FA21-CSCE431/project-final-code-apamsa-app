Rails.application.routes.draw do
  resources :users
  resources :rsvps
  resources :events do
    resources :rsvps 
  end

  root "events#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
