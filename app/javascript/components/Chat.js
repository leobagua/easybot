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
        console.log(current_id, next_id);

        messages.push({
            id: next_id,
            text: message,
            agent: 'Eu',
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
                agent: 'Uno Bot',
                bot: true
            });
            this.setState({ messages: messages });
        });
    };

    render() {
        return (
            <div className="row">
                <div className="chat" style={{ minHeight: window.innerHeight }}>
                    <ChatHeader quantidadeMensagens={ this.state.messages[this.state.messages.length -1].id }/>
                    <Messages messages={ this.state.messages }/>
                    <div className="chat-message clearfix">
                        <Input onSendMessage={ this.onSendMessage }/>
                    </div>
                </div>
            </div>
        );
    }
}