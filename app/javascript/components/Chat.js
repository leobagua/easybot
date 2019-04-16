import React, {Component} from "react";

import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import Input from "./Input";

import axios from 'axios';


export default class Chat extends Component {

    state = {
        messages: [
            {
                id: 1,
                text: this.props.defaultFallbackMessage,
                bot: true
            }
        ],
        contexts: [],
        authenticity_token: '',
    };

    componentDidMount() {
        this.setState({
                authenticity_token: $('meta[name=csrf-token]').attr('content'),
            }
        );
    }

    onSendMessage = (message) => {
        const messages = this.state.messages;
        const current_id = this.state.messages[this.state.messages.length -1].id;
        const next_id = current_id + 1;

        messages.push({
            id: next_id,
            text: message,
            bot: false
        });

        axios.post(
            'chats/intents/',
            {
                message: message,
                contexts: this.state.contexts,
                authenticity_token: this.state.authenticity_token
            }
        ).then(resposta => {
            const { fulfillment, parameters, contexts } = resposta.data;

            messages.push({
                id: next_id + 1,
                text: fulfillment.speech,
                bot: true
            });

            this.setState({ messages: messages, contexts: contexts });
        });
    };

    render() {
        const { chatbotImage, chatbotName } = this.props;

        return (
            <div className="wrapper">
                <ChatHeader chatbotImage={chatbotImage} chatbotName={chatbotName} />
                <Messages messages={ this.state.messages } />
                <div className="bottom">
                    <Input onSendMessage={ this.onSendMessage } />
                </div>
            </div>
        );
    }
}