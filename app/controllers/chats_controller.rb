class ChatsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :fulfillments

  before_action :check_config
  before_action :chat_params, only: :intents
  before_action :fulfillment_params, only: :fulfillments

  def index
    @config = Config.first
    render component: 'Chat', props: { chatbotName: @config.chatbot_name, defaultFallbackMessage: @config.default_fallback_message, chatbotImage: url_for(@config.chatbot_image) }
  end

  def intents
    response = Chat.intent(@chat_params[:chat])
    render json: response[:result], status: :ok
  end

  def fulfillments
    render json: Chat.context(@fulfillment_params[:queryResult][:parameters][:curso], @fulfillment_params[:queryResult][:intent][:displayName]), status: :ok
  end

  private

  def chat_params
    @chat_params = params.permit chat: [:message, contexts: [:name, :lifespan, parameters: [:curso]]]
  end

  def fulfillment_params
    @fulfillment_params = params.permit queryResult: { parameters: [:curso], intent: [:displayName] }
  end

  def check_config
    redirect_to configs_path unless Config.exists?
  end

end