import React from "react";

import {Typography, CircularProgress} from "@mui/material";

import AppBar from "./AppBar"
// import Container from "./Container"
// import ZoneCard from "./ZoneCard"

// import RNet from "../rnet/RNet"

const ZonesOverviewView: React.FC = () => {
    return (
        <AppBar serverName="Test" />
    )
}

// class ZonesOverviewViewO extends Component {
//     state = {
//         connected: false,
//         connectionMessage: false,
//         serverName: "RNet Remote"
//     }

//     componentDidMount() {
//         this._rNet = RNet.instance;
//         this._rNet.addListener(this);
//     }

//     componentDidUnMount() {
//         this._rNet.removeListener(this);
//         this._rNet = undefined;
//     }

//     render() {
//         const classes = this.props.classes;

//         const render = [
//             (
//                 <AppBar
//                     serverName={this.state.serverName}
//                     connected={this.state.connected} />
//             )
//         ]

//         if (this.state.connected) {
//             render.push((
//                 <Container>
//                     <div className={classes.cardHolder}>
//                         {this.state.index.map((index) => {
//                             return <ZoneCard key={`${index[0]}-${index[1]}`} controllerId={index[0]} zoneId={index[1]} />;
//                         })}
//                     </div>
//                 </Container>
//             ))
//         }
//         else {
//             render.push((
//                 <div className={classes.loadingHolder}>
//                     <div className={classes.loadingBox}>
//                         <CircularProgress color="secondary"/>
//                         {this.state.connectionMessage &&
//                             <Typography
//                                 className={classes.loadingText}
//                                 variant="body2">
//                                 Unable to connect. Retrying...
//                             </Typography>
//                         }
//                     </div>
//                 </div>
//             ));
//         }

//         return render;
//     }

//     indexReceived() {
//         this.setState({index: this._rNet.getZoneIndex()});
//     }

//     ready() {
//         this.setState({connected: true});
//     }

//     disconnected() {
//         this.setState({
//             connected: false,
//             connectionMessage: true
//         });
//     }

//     propertyChanged(propertyId, propertyValue) {
//         if (propertyId == RNet.PROPERTY_NAME)
//             this.setState({serverName: propertyValue});
//     }
// }

export default ZonesOverviewView;
