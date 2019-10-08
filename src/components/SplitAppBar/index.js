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

class AppBar extends React.Component {
    render() {
        const classes = this.props.classes;

        return (
            <MuiAppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {this.props.title}
                    </Typography>
                </Toolbar>
            </MuiAppBar>
        )
    }
}

export default withStyles(styles)(AppBar);
