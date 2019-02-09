Rails.application.routes.draw do
  root 'chats#index'

  resources :chats do
    collection do
      post :intents
    end
  end
end
