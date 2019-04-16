class ConfigsController < ApplicationController
  before_action :check_config

  def index; end

  def create
    @config = Config.new(config_params)

    if @config.save
      render json: @config, status: :created
    else
      render json: { errors: @config.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def config_params
    params.permit(:chatbot_name, :chatbot_image, :default_fallback_message, :client_access_token, :user_email, :user_password)
  end

  def check_config
    redirect_to chats_path if Config.exists?
  end
end