class Chat
  class << self
    def intent params
      client = ApiAiRuby::Client.new client_access_token: Config.client_access_token
      client.text_request params[:message], { contexts: params[:contexts] }
    end

    def context parameter, intent
      response_text = Answer.find_by(parameter_match: parameter, intent: intent)&.response || 'Desculpe, mas não entendi. Poderia repetir a pergunta?'
      {
          fulfillmentText: response_text
      }
    end
  end
end