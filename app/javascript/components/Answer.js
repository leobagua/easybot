import React, {Component} from 'react';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Logout from '@material-ui/icons/ExitToApp';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Table from './Table'
import axios from 'axios';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});

class Answer extends Component {

    state = {
        mobileOpen: false,
    };

    componentDidMount() {
        this.setState({
                authenticity_token: $('meta[name=csrf-token]').attr('content'),
            }
        );
    }

    handleDrawerToggle = () => {
        this.setState(state => ({mobileOpen: !state.mobileOpen}));
    };

    handleLogout = () => {
        axios.delete('/users/sign_out/', {data: {authenticity_token: this.state.authenticity_token}}).then(resposta => {
            window.location.href = "/answers/";
        }).catch((error) => {
            window.location.href = "/answers";
        });
    };

    new = () => {
        window.location.href = "/answers/new";
    };

    render() {
        const {classes, theme, answers} = this.props;
        const drawer = (
            <div>
                <div className={classes.toolbar}/>
                <Divider/>
                <List>
                    <ListItem button key="cadastrar_nova_resposta" onClick={ this.new }>
                        <ListItemIcon><AddIcon/></ListItemIcon>
                        <ListItemText primary="Cadastrar Nova Resposta"/>
                    </ListItem>
                </List>
            </div>
        );

        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerToggle} className={classes.menuButton}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            Respostas
                        </Typography>
                        <IconButton color="inherit" aria-label="Sair" onClick={this.handleLogout}>
                            <Logout/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer}>
                    <Hidden smUp implementation="css">
                        <Drawer container={this.props.container} variant="temporary" open={this.state.mobileOpen}
                                onClose={this.handleDrawerToggle} classes={{paper: classes.drawerPaper}}>
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer classes={{paper: classes.drawerPaper}} variant="permanent" open>
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Typography paragraph>
                        Cadastre as Respostas personalizadas que o Chatterbot vai enviar ao estudante.
                    </Typography>
                    <div>
                        <Table answers={answers}/>
                    </div>
                </main>
            </div>
        );
    }
}

Answer.propTypes = {
    classes: PropTypes.object.isRequired,
    container: PropTypes.object,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(Answer);