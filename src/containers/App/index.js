import React  from "react";

import {ThemeProvider, withStyles} from "@material-ui/styles"
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from "../../config/theme"
import ZonesOverviewView from "../../containers/ZonesOverviewView"
import AppSettingsView from "../../containers/AppSettingsView"

import RNet from "../../rnet/RNet"

import styles from "./styles"

class App extends React.Component {
    componentDidMount() {
        this._rNet = RNet.instance;
        this._rNet.connect();
    }

    render() {
        const classes = this.props.classes;

        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className={classes.root}>
                    <div className={classes.mainViewContainer}>
                        <ZonesOverviewView />
                    </div>
                    {false &&
                        <div className={classes.splitViewContainer}>
                            <AppSettingsView />
                        </div>
                    }
                </div>
            </ThemeProvider>
        )
    }
}

export default withStyles(styles)(App);
