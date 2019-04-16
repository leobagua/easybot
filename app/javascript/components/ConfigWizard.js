import React, { Component } from 'react';
import { TextField, Button, Stepper, Step, StepLabel, Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import axios from 'axios';

registerPlugin(FilePondPluginImagePreview);


export default class ConfigWizard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticity_token: '',
            showError: false,
            showSuccess: false,
            errorMessages: [],
            activeStep: 0,
            steps: [
                'Configurações Básicas',
                'Configurações do Dialogflow',
                'Definir o Login e Senha',
                'Revisar Informações',
            ],
            config: {
                chatbotName: '',
                chatbotImage: [],
                defaultFallbackMessage: '',
                clientAccessToken: '',
                userEmail: '',
                userPassword: ''
            }
        }
    }

    componentDidMount() {
        this.setState({
                authenticity_token: $('meta[name=csrf-token]').attr('content')
            }
        );
    }

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            config: {
                chatbotName: '',
                chatbotImage: [],
                defaultFallbackMessage: '',
                clientAccessToken: '',
                userEmail: '',
                userPassword: ''
            }
        });

        this.setState({
            activeStep: 0,
        });
    };

    handleChangeInput = event => {
        const { config } = this.state;
        config[event.target.name] = event.target.value;

        this.setState({
            config: config
        });
    };

    handleImageChoose = (images) => {

        const { config } = this.state;
        config.chatbotImage = images;

        this.setState({
            config: config
        });
    };

    handleCloseSnackbar = () => {
      this.setState({
          showError: false,
          showSuccess: false,
      })
    };

    contentStepOne = () => {
        return(
            <div className="row">
                <div className="col-12">
                    <TextField required value={ this.state.config.chatbotName } onChange={ this.handleChangeInput.bind(this) } name="chatbotName" label="Nome do Bot" placeholder="Ex: Botíneo, o Bot" margin="normal" variant="outlined" fullWidth />
                    <TextField required value={ this.state.config.defaultFallbackMessage } onChange={ this.handleChangeInput.bind(this) } name="defaultFallbackMessage" label="Mensagem de Boas Vindas" placeholder="Ex: Olá! Como posso ajudá lo?" margin="normal" variant="outlined" fullWidth />
                    <FilePond files={ this.state.config.chatbotImage } allowMultiple={ false } onupdatefiles={ this.handleImageChoose.bind(this) } labelIdle='*Arraste o avatar do Bot aqui ou <span class="filepond--label-action">Selecione</span>'/>
                </div>
            </div>
        )
    };

    contentStepTwo = () => {
        return(
            <div className="row">
                <div className="col-12">
                    <TextField required value={ this.state.config.clientAccessToken } onChange={ this.handleChangeInput.bind(this) } name="clientAccessToken" label="Client Access Token" placeholder="Disponível nas configurações do Dialogflow" margin="normal" variant="outlined" fullWidth />
                </div>
            </div>
        )
    };

    contentStepTree = () => {
        return(
            <div className="row">
                <div className="col-12">
                    <TextField required value={ this.state.config.userEmail } onChange={ this.handleChangeInput.bind(this) } name="userEmail" label="Email de Acesso" margin="normal" variant="outlined" fullWidth />
                    <TextField required value={ this.state.config.userPassword } onChange={ this.handleChangeInput.bind(this) } type="password" name="userPassword" label="Senha de Acesso" margin="normal" variant="outlined" fullWidth />
                </div>
            </div>
        )
    };

    contentStepFour = () => {
        return(
            <div className="row">
                <div className="col-12">
                    <TextField required value={ this.state.config.chatbotName } label="Nome do Bot" margin="normal" variant="outlined" fullWidth disabled />
                    <TextField required value={ this.state.config.defaultFallbackMessage } label="Mensagem de Boas Vindas" margin="normal" variant="outlined" fullWidth disabled />
                    <TextField required value={ this.state.config.clientAccessToken } label="Client Access Token" margin="normal" variant="outlined" fullWidth disabled />
                    <TextField required value={ this.state.config.userEmail } onChange={ this.handleChangeInput.bind(this) } type="email" label="Email de Acesso" margin="normal" variant="outlined" fullWidth disabled />
                    <FilePond files={ this.state.config.chatbotImage } allowMultiple={ false } disabled />
                </div>
            </div>
        )
    };

    save = () => {
        const image = this.state.config.chatbotImage[0] ? this.state.config.chatbotImage[0].file : null;
        const data = new FormData();

        data.append('chatbot_name', this.state.config.chatbotName);
        if(image) data.append('chatbot_image', image, image.filename);
        data.append('default_fallback_message', this.state.config.defaultFallbackMessage);
        data.append('client_access_token', this.state.config.clientAccessToken);
        data.append('authenticity_token', this.state.authenticity_token);
        data.append('user_email', this.state.config.userEmail);
        data.append('user_password', this.state.config.userPassword);

        axios.post(
            'configs/',
            data
        ).then(resposta => {
            this.setState({
                showError: false,
                showSuccess: true,
                errorMessages: []
            });
            setTimeout(function () { window.location.href = "/chats"; }, 1500);
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

        const { steps, activeStep } = this.state;

        return (
            <div className="container">
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
                    <div className="col-lg-12">
                        <div className="jr-card">
                            <div className="jr-card-header ">
                                <h3 className="card-heading">
                                    <span>Configuração Inicial</span>
                                </h3>
                            </div>
                            <div className="jr-card-body">
                                <Stepper activeStep={ activeStep } alternativeLabel>
                                    {
                                        steps.map(label => (
                                            <Step key={ label }>
                                                <StepLabel>{ label }</StepLabel>
                                            </Step>
                                        ))
                                    }
                                </Stepper>
                                { activeStep === 0 && this.contentStepOne() }
                                { activeStep === 1 && this.contentStepTwo() }
                                { activeStep === 2 && this.contentStepTree() }
                                { activeStep === 3 && this.contentStepFour() }
                                <div className="row mt-5">
                                    <div className="col-lg-12">
                                        {this.state.activeStep === steps.length ? (
                                            <div>
                                                <Button onClick={ this.handleReset }>Reiniciar</Button>
                                            </div>
                                        ) : (
                                            <div>
                                                <Button disabled={ activeStep === 0 } onClick={ this.handleBack } className="mr-2">Voltar</Button>
                                                {
                                                    activeStep === steps.length - 1 ?
                                                        <Button variant="contained" color="primary" onClick={ this.save } className="ml-2">
                                                            Finalizar
                                                        </Button>
                                                        :
                                                        <Button variant="contained" color="primary" onClick={ this.handleNext } className="ml-2">
                                                            Próximo
                                                        </Button>
                                                }
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
