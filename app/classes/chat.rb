class Chat
  class << self
    def intent params
      client = ApiAiRuby::Client.new :client_access_token => '69f935dbe8b3410ca567b72dfacd107b'
      client.text_request params[:message]
    end

    def context params
      {
          fulfillmentText: "O Curso é legal",
          payload: {
              "google": {
                  "expectUserResponse": true,
                  "richResponse": {
                      "items": [
                          {
                              "simpleResponse": {
                                  "textToSpeech": "this is a simple response"
                              }
                          }
                      ]
                  }
              }
          }
      }
    end
  end
end