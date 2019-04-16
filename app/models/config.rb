class Config < ApplicationRecord

  has_one_attached :chatbot_image

  attr_accessor :user_email, :user_password

  validates :client_access_token, :chatbot_name, :default_fallback_message, :chatbot_image, :user_email, :user_password, presence: true

  after_create :create_user

  private

  class << self
    def client_access_token
      Config.first.client_access_token
    end
  end

  def create_user
    User.create! email: user_email, password: user_password
  end

end