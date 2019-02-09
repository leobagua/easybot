class Chat
  class << self
    def intent params
      client = ApiAiRuby::Client.new :client_access_token => '69f935dbe8b3410ca567b72dfacd107b'
      client.text_request params[:message]
    end
  end
end