import React, {Component} from 'react';
import BotAvatar from 'images/bot-avatar.png'

export default class ChatHeader extends Component {

    render() {
        const { quantidadeMensagens } = this.props;

        return (
            <div className="chat-header clearfix">
                <img src={ BotAvatar } alt="avatar" className="img-fluid img-thumbnail rounded-circle" width="80" height="80" />
                <div className="chat-about">
                    <div className="chat-with">Unobot</div>
                    <div className="chat-num-messages">{ quantidadeMensagens <= 1 ? `${quantidadeMensagens} mensagem` : `${quantidadeMensagens} mensagens` }</div>
                </div>
            </div>
        );
    }
}