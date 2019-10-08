import React, { Component } from "react"

import { withStyles } from "@material-ui/styles"

import AppBar from "../../components/SplitAppBar"
import Container from "../../components/Container"

import styles from "./styles"

class AppSettingsView extends Component {
    render() {
        const classes = this.props.classes;

        return (
            <div>
                <AppBar title="Settings"/>
                <Container>
                    Settings Here pl0x
                </Container>
            </div>
        )
    }
}

export default withStyles(styles)(AppSettingsView);
