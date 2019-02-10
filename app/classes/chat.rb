class Chat
  class << self
    def intent params
      client = ApiAiRuby::Client.new :client_access_token => '69f935dbe8b3410ca567b72dfacd107b'
      client.text_request params[:message]
    end

    def context params
      {
          speech: 'Next game schedules will be available soon',
          displayText: 'Next game schedules will be available soon',
          source: 'game schedule'
      }
    end
  end
end