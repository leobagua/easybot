import React, {Component} from 'react';

export default class Table extends Component {

    renderRow(answer) {

        const {id, parameter_match, response, intent} = answer;

        return (
            <tr key={id} >
                <th scope="row">{id}</th>
                <td>{parameter_match}</td>
                <td>{intent}</td>
                <td>{response}</td>
            </tr>
        );
    }

    render() {
        const {answers} = this.props;
        return (
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Termo de Pesquisa</th>
                    <th scope="col">Dialogflow Intent</th>
                    <th scope="col">Resposta</th>
                </tr>
                </thead>
                <tbody>
                  { answers.map(answer => this.renderRow(answer)) }
                </tbody>
            </table>
        );
    }
}