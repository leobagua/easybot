Rails.application.routes.draw do
  root 'chats#index'

  resources :chats do
    collection do
      post :intents
      post :fulfillments
    end
  end
end
