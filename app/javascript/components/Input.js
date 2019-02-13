import {Component} from "react";
import React from "react";

export default class Input extends Component {

    state = {
        text: ""
    };

    onChange(e) {
        this.setState({ text: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({ text: "" });
        this.props.onSendMessage(this.state.text);
    }

    render() {
        return (
            <form onSubmit={e => this.onSubmit(e)}>
                <input onChange={e => this.onChange(e)} className="input" value={ this.state.text } type="text" placeholder="Digite sua mensagem aqui" />
                <button className="send" />
            </form>
        );
    }
}