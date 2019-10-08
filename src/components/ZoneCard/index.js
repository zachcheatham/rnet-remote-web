import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import InputIcon from '@material-ui/icons/Input';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import TuneIcon from '@material-ui/icons/Tune';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

import styles from "./styles";

import RNet from "../../rnet/RNet";
import Zone from "../../rnet/Zone";
import Source from "../../rnet/Source";

class ZoneCard extends Component {
    state = {
        name: "",
        power: false,
        volume: 0,
        maxVolume: 100,
        muted: false,
        mediaBackground: null,
        sourcesOpen: null,
        sourcesAnchor: null
    }

    componentDidMount() {
        this._rNet = RNet.instance;
        this._rNet.addListener(this);
        this._zone = this._rNet.getZone(this.props.controllerId, this.props.zoneId);
        this._source = this._rNet.getSource(this._zone.getSourceId());

        this.setState({
            name: this._zone.getName(),
            power: this._zone.getPower(),
            muted: this._zone.getMute(),
            volume: this._zone.getVolume(),
            maxVolume: this._zone.getMaxVolume(),
            mediaBackground: this._source && this._source.getMediaArtworkUrl() || null
        })
    }

    componentDidUnMount() {
        this._rNet.removeListener(this);
        this._rNet = null;
        this._zone = null;
        this._source = null;
    }

    render() {
        const classes = this.props.classes;

        return (
            <Card className={classes.card}>
                <div
                    style={{backgroundImage: `url('${this.state.power && this.state.mediaBackground}')`}}
                    className={classes.mediaBackground} />
                <CardContent className={classes.cardContent}>
                    <Typography variant="h6">
                        <center>{this.state.name}</center>
                    </Typography>
                    <div className={classes.controls}>
                        <IconButton
                            color={this.state.power && "secondary" || "inherit"}
                            onClick={this._handlePower}
                            aria-label="zone power">
                            <PowerSettingsNewIcon/>
                        </IconButton>
                        <IconButton
                            disabled={!this.state.power}
                            onClick={this._handleSourceSelect}
                            aria-label="zone source">
                            <InputIcon/>
                        </IconButton>
                        <IconButton aria-label="zone settings">
                            <TuneIcon/>
                        </IconButton>
                    </div>
                </CardContent>
                <CardContent className={classes.volumeContainer + " " +  classes.cardContent}>
                    <IconButton
                        disabled={!this.state.power}
                        onClick={this._handleMute}
                        aria-label="mute zone">
                        {this.state.muted &&
                            <VolumeOffIcon className={classes.muteIcon}/>||
                            <VolumeUpIcon/>}

                    </IconButton>
                    <Slider
                        className={classes.volume}
                        color="secondary"
                        valueLabelDisplay="auto"
                        value={this.state.volume}
                        min={0}
                        max={this.state.maxVolume}
                        disabled={!this.state.power}
                        onChange={this._handleVolumeChange}
                        aria-labelledby="zone volume" />
                </CardContent>
                <Menu>
                    <MenuItem>
                        <ListItemIcon>
                            <VolumeOffIcon/>
                        </ListItemIcon>
                        <Typography variant="inherit">Test Source</Typography>
                    </MenuItem>
                </Menu>
            </Card>
        )
    }

    _handlePower = event => {
        this._zone.setPower(!this._zone.getPower());
    }

    _handleSourceSelect = event => {
        this.setState({sourcesAnchor: event.currentTarget});
    }

    _handleMute = event => {
        this._zone.setMute(!this._zone.getMute());
    }

    _handleVolumeChange = (event, value) => {
        this._zone.setVolume(value);
    }

    zoneChanged(zone, remotely, changeType) {
        if (zone === this._zone) {
            switch (changeType) {
                case Zone.CHANGE_TYPE_NAME:
                    this.setState({name: zone.getName()});
                    break;
                case Zone.CHANGE_TYPE_POWER:
                    this.setState({power: zone.getPower()});
                    break;
                case Zone.CHANGE_TYPE_VOLUME:
                    this.setState({volume: zone.getVolume()});
                    break;
                case Zone.CHANGE_TYPE_MUTE:
                    this.setState({muted: zone.getMute()});
                    break;
                case Zone.CHANGE_TYPE_MAX_VOLUME:
                    this.setState({maxVolume: zone.getMaxVolume()});
                    break;
                case Zone.CHANGE_TYPE_SOURCE:
                    this._source = this._rNet.getSource(zone.getSourceId());
                    this.setState({
                        mediaBackground: this._source && this._source.getMediaArtworkUrl() || null
                    });

            }
        }
    }

    sourceChanged(source, remotely, changeType) {
        if (source === this._source) {
            if (changeType == Source.CHANGE_TYPE_METADATA) {
                this.setState({mediaBackground: source.getMediaArtworkUrl()})
            }
        }
    }
}

export default withStyles(styles)(ZoneCard);
