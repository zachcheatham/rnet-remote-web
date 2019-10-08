import React  from "react";
import {BrowserRouter} from "react-router-dom";

import { withStyles } from "@material-ui/styles"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MuiAppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

import styles from "./styles"

import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import RNet from "../../rnet/RNet"

class AppBar extends React.Component {

    state = {
        anchorElement: null
    }

    componentDidMount() {
        this._rNet = RNet.instance;
    }

    componentDidUnMount() {
        this._rNet = null;
    }

    render() {
        const classes = this.props.classes;

        return (
            <MuiAppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {this.props.serverName}
                    </Typography>
                    {this._renderButtons(classes)}
                    <IconButton
                        aria-controls="main-options-menu"
                        aria-haspopup="true"
                        aria-label="more options"
                        onClick={this._handleMenuClick}
                    >
                        <MoreVertIcon/>
                    </IconButton>
                    <Menu
                        id="main-options-menu"
                        anchorEl={this.state.anchorElement}
                        keepMounted
                        open={Boolean(this.state.anchorElement)}
                        onClose={this._handleMenuClose}
                    >
                        {this._renderAddZoneOption()}
                        <MenuItem>Settings</MenuItem>
                    </Menu>
                </Toolbar>
            </MuiAppBar>
        )
    }

    _renderButtons(classes) {
        if (this.props.connected) {
            return (
                <>
                    <Button className={classes.button} aria-label="mute all zones">
                        <VolumeOffIcon className={classes.buttonIcon}/> Mute All Zones
                    </Button>
                    <Button className={classes.button} aria-label="all zones power control">
                        <PowerSettingsNewIcon className={classes.buttonIcon}/> All On/Off
                    </Button>
                </>
            )
        }
    }

    _renderAddZoneOption() {
        if (this.props.connected) {
            return <MenuItem>Add Zone</MenuItem>
        }
    }

    _handleMenuClick = event => {
        this.setState({anchorElement: event.currentTarget});
    }

    _handleMenuClose = event => {
        this.setState({anchorElement: null});
    }
}

export default withStyles(styles)(AppBar);
