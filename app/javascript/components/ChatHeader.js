import React, {Component} from 'react';
import BotAvatar from 'images/bot-avatar.png'

export default class ChatHeader extends Component {

    render() {
        return (
            <div className="col-lg-12">

                <nav className="nav">
                    <div className="default-nav">
                        <div className="main-nav">
                            <div className="avatar">
                                <img className="img-fluid rounded-circle" src={ BotAvatar } />
                            </div>
                            <div className="main-nav-item">
                                <a className="main-nav-item-link" href="#">Unobot</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}