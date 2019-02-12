Rails.application.routes.draw do

  resources :images, only: [:index, :show]
  resources :comments, only: [:index, :show, :create, :delete]
  post '/likes', to: 'images#increase_likes'
end
