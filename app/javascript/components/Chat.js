import {Component} from "react";
import React from "react";

import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import Input from "./Input";

import axios from 'axios';


export default class Chat extends Component {

    state = {
        messages: [
            {
                id: 1,
                text: "Olá, tudo bem? Eu sou o UnoBot! Estou aqui para te ajudar!",
                agent: "Uno Bot",
                bot: true
            }
        ],
        authenticity_token: '',
    };

    componentDidMount() {
        this.setState({
                authenticity_token: $('meta[name=csrf-token]').attr('content')
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
                authenticity_token: this.state.authenticity_token
            }
        ).then(resposta => {
            messages.push({
                id: next_id + 1,
                text: resposta.data.speech,
                bot: true
            });

            this.setState({ messages: messages });
        });
    };

    render() {
        return (
            <div className="wrapper">
                <ChatHeader />
                <Messages messages={ this.state.messages }/>
                <div className="bottom">
                    <Input onSendMessage={ this.onSendMessage } />
                </div>
            </div>
        );
    }
}