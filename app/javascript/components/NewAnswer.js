import React, {Component} from 'react';
import { TextField, Button, Snackbar, SnackbarContent, IconButton  } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';

export default class NewAnswe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticity_token: '',
            showError: false,
            showSuccess: false,
            errorMessages: [],
            parameterMatch: '',
            response: '',
            intent: ''
        }
    }

    componentDidMount() {
        this.setState({
                authenticity_token: $('meta[name=csrf-token]').attr('content')
            }
        );
    }

    handleChangeInput = event => {
        const {name, value} = event.target;
        this.setState({ [name]: value });
    };

    back = () => {
        window.location.href = "/answers";
    };

    save = () => {
        const data = new FormData();

        data.append('parameter_match', this.state.parameterMatch);
        data.append('intent', this.state.intent);
        data.append('response', this.state.response);
        data.append('authenticity_token', this.state.authenticity_token);

        axios.post(
            '/answers/',
            data
        ).then(resposta => {
            this.setState({
                showError: false,
                showSuccess: true,
                errorMessages: []
            });
            setTimeout(function () { window.location.href = "/answers"; }, 1500);
        }).catch((error) => {
            if (error.response) {
                this.setState({
                    showError: true,
                    showSuccess: false,
                    errorMessages: error.response.data.errors
                });
            } else if (error.request) {
                this.setState({
                    showError: true,
                    showSuccess: false,
                    errorMessages: error.request
                });
            } else {
                this.setState({
                    showError: true,
                    showSuccess: false,
                    errorMessages: error.message
                });
            }
        });
    };

    render() {
        return (
            <div className="col-lg-12">
                <div className="row">
                    {
                        <div className="col-lg-12">
                            <Snackbar
                                open={ this.state.showSuccess } anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} onClose={ this.handleCloseSnackbar }>
                                <SnackbarContent
                                    style={{ backgroundColor: '#43a047' }}
                                    message={
                                        <span style={{ display: 'flex', alignItems: 'center' }}>
                                            <CheckCircleIcon  style={{ fontSize: 20, opacity: 0.9, marginRight: 10 }} />
                                            Sucesso! Configuração salva com sucesso.
                                        </span>
                                    }
                                    action={[
                                        <IconButton key="close" aria-label="Close" color="inherit" style={{ fontSize: 20 }} onClick={ this.handleCloseSnackbar } >
                                            <CloseIcon />
                                        </IconButton>
                                    ]}
                                />
                            </Snackbar>
                            <Snackbar open={ this.state.showError } anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} onClose={ this.handleCloseSnackbar } >
                                <SnackbarContent
                                    style={{ backgroundColor: '#d32f2f' }}
                                    message={
                                        <div>
                                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                                <ErrorIcon  style={{ fontSize: 20, opacity: 0.9, marginRight: 10 }} />Erro! Não foi possível salvar a configuração.
                                            </span>
                                            { this.state.errorMessages.map((mensagem) => (
                                                <span style={{ display: 'flex', alignItems: 'center' }}>
                                                    <ErrorIcon  style={{ fontSize: 20, opacity: 0.9, marginRight: 10 }} />
                                                    { mensagem }
                                                </span>
                                            ))}
                                        </div>
                                    }
                                    action={[
                                        <IconButton key="close" aria-label="Close" color="inherit" style={{ fontSize: 20 }} onClick={ this.handleCloseSnackbar } >
                                            <CloseIcon />
                                        </IconButton>
                                    ]}
                                />
                            </Snackbar>
                        </div>
                    }
                    <div className="col-12">
                        <TextField required value={ this.state.parameterMatch } onChange={ this.handleChangeInput.bind(this) } name="parameterMatch" label="Parâmetro" placeholder="Como foi definido no Dialogflow. Ex: Sistemas de Informação" margin="normal" variant="outlined" fullWidth />
                        <TextField required value={ this.state.intent } onChange={ this.handleChangeInput.bind(this) } name="intent" label="Intenção" placeholder="Como foi definido no DialogFlow. Ex: graduacao.informacao.cursos" margin="normal" variant="outlined" fullWidth />
                        <TextField required value={ this.state.response } onChange={ this.handleChangeInput.bind(this) } multiline rows="6" name="response" label="Resposta" placeholder="Ex: O Curso de Sistemas de Informação tem 8 Semestres" margin="normal" variant="outlined" fullWidth />
                    </div>
                    <div className="col-12">
                        <Button variant="contained" color="primary" onClick={ this.save } >Salvar</Button>
                        <Button variant="contained" className="ml-2" onClick={ this.back }>Voltar</Button>
                    </div>
                </div>
            </div>
        );
    }
}