import React  from "react";

import {
    Button, IconButton, Menu, MenuItem, AppBar,
    Toolbar, Typography
} from "@mui/material";

import {
    VolumeOff, MoreVert, PowerSettingsNew
} from "@mui/icons-material";

import * as styles from "../../style/appbar.scss"

interface RnetAppBarProps {
    serverName: string;
}

const RnetAppBar: React.FC<RnetAppBarProps> = ({serverName}) => {
    return (
        <AppBar position="relative">
            <Toolbar>
                    <Typography variant="h6" className={styles.title}>
                        {serverName}
                    </Typography>
                    {/* {this._renderButtons(classes)} */}
                    {/* <IconButton
                        aria-controls="main-options-menu"
                        aria-haspopup="true"
                        aria-label="more options"
                        onClick={this._handleMenuClick}
                    >
                        <MoreVert />
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
                    </Menu> */}
                </Toolbar>
        </AppBar>
    );
};

// class AppBarO extends React.Component {

//     state = {
//         anchorElement: null
//     }

//     componentDidMount() {
//         this._rNet = RNet.instance;
//     }

//     componentDidUnMount() {
//         this._rNet = null;
//     }

//     render() {
//         const classes = this.props.classes;

//         return (
//             <MuiAppBar position="relative">
//                 <Toolbar>
//                     <Typography variant="h6" className={classes.title}>
//                         {this.props.serverName}
//                     </Typography>
//                     {this._renderButtons(classes)}
//                     <IconButton
//                         aria-controls="main-options-menu"
//                         aria-haspopup="true"
//                         aria-label="more options"
//                         onClick={this._handleMenuClick}
//                     >
//                         <MoreVertIcon/>
//                     </IconButton>
//                     <Menu
//                         id="main-options-menu"
//                         anchorEl={this.state.anchorElement}
//                         keepMounted
//                         open={Boolean(this.state.anchorElement)}
//                         onClose={this._handleMenuClose}
//                     >
//                         {this._renderAddZoneOption()}
//                         <MenuItem>Settings</MenuItem>
//                     </Menu>
//                 </Toolbar>
//             </MuiAppBar>
//         )
//     }

//     _renderButtons(classes) {
//         if (this.props.connected) {
//             return (
//                 <>
//                     <Button className={classes.button} aria-label="mute all zones">
//                         <VolumeOffIcon className={classes.buttonIcon}/> Mute All Zones
//                     </Button>
//                     <Button className={classes.button} aria-label="all zones power control">
//                         <PowerSettingsNewIcon className={classes.buttonIcon}/> All On/Off
//                     </Button>
//                 </>
//             )
//         }
//     }

//     _renderAddZoneOption() {
//         if (this.props.connected) {
//             return <MenuItem>Add Zone</MenuItem>
//         }
//     }

//     _handleMenuClick = event => {
//         this.setState({anchorElement: event.currentTarget});
//     }

//     _handleMenuClose = event => {
//         this.setState({anchorElement: null});
//     }
// }

export default RnetAppBar;
