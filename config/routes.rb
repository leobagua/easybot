Rails.application.routes.draw do
  root 'configs#index'

  devise_for :users
  devise_scope :user do
    root to: "devise/sessions#new"
  end

  resources :chats do
    collection do
      post :intents
      post :fulfillments
    end
  end
  resources :answers
  resources :configs, only: [:index, :create]
end