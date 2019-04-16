import React, {Component} from 'react';

export default class ChatHeader extends Component {

    render() {

        const { chatbotImage, chatbotName } = this.props;

        return (
            <div className="col-lg-12">
                <nav className="nav">
                    <div className="default-nav">
                        <div className="main-nav">
                            <div className="avatar chat-avatar-mode">
                                <img className="img-fluid rounded-circle avatar-img" src={chatbotImage}/>
                                <span className="chat-mode online"/>
                            </div>
                            <div className="main-nav-item">
                                <a className="main-nav-item-link" href="#">{chatbotName}</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}