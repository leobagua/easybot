import React, {Component} from "react";

export default class Messages extends Component {

    renderMessage(message) {

        const { id, bot, text, agent} = message;
        const className = bot ? "message other-message float-right" : "message my-message";

        return (
            <li className={ bot ? 'clearfix' : '' } key={ id } >
                <div className={ bot ? "message-data align-right" : 'message-data' }>
                    <span className="message-data-time">10:10 AM, Today</span> &nbsp; &nbsp;
                    <span className="message-data-name">{ agent }</span>
                    <i className="fa fa-circle me" />
                </div>

                <div className={ className }>
                    {text}
                </div>
            </li>
        );
    }


    render() {
        const { messages } = this.props;

        return (
            <div className="chat-history">
                <ul>
                    { messages.map(m => this.renderMessage(m)) }
                </ul>
            </div>
        );
    }
}