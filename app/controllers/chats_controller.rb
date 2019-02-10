class ChatsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :fulfillments
  before_action :chat_params, only: :intents

  def index;
  end

  def intents
    response = Chat.intent(@chat_params[:chat])
    render json: response[:result][:fulfillment], status: :ok
  end

  def fulfillments
    render json: Chat.context({a: 1}), status: :ok
  end

  private

  def chat_params
    @chat_params = params.permit chat: :message
  end

end