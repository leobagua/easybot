import React, {Component} from "react";
import BotAvatar from 'images/bot-avatar.png';
import UserAvatar1 from 'images/user-1.png';
import UserAvatar2 from 'images/user-2.png';

let currentUserAvatar = null;

export default class Messages extends Component {

    scrollToBottom = () => {
        this.chatEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    setUserAvatar() {
        if (currentUserAvatar) {
            return (currentUserAvatar);
        } else {
            const randomUserAvatar = [UserAvatar1, UserAvatar2];
            const num = Math.floor(Math.random() * randomUserAvatar.length);
            currentUserAvatar = randomUserAvatar[num];
        }
    }

    renderMessage(message) {

        const {id, bot, text} = message;
        const className = bot ? "them" : "me";

        return (
            <div className={`message-wrapper ${className}`} key={id} ref={(el) => { this.chatEnd = el; }} >
                <div className="circle-wrapper animated bounceIn">
                    <img className="img-fluid rounded-circle" src={ bot ? BotAvatar : currentUserAvatar }/>
                </div>
                <div className="text-wrapper animated fadeIn">{text}</div>
            </div>
        );
    }

    render() {
        const {messages} = this.props;
        this.setUserAvatar();

        return (
            <div className="inner">
                <div className="content">
                    { messages.map(m => this.renderMessage(m)) }
                </div>
            </div>
        );
    }
}