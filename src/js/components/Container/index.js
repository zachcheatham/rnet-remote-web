import React, { Component } from "react"
import { withStyles } from "@material-ui/styles"

import styles from "./styles"

class Container extends Component {
    render() {
        const classes = this.props.classes;

        return (
            <div className={classes.container}>
                {this.props.children}
            </div>
        )
    }
}

export default withStyles(styles)(Container);
