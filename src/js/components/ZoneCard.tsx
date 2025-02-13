import React, { useState, useEffect } from "react";

import { useRNet } from "../rnet/RNetContext";
import { Event } from "../rnet/RNet";
import Zone from "../rnet/Zone";
import Source from "../rnet/Source";
import { Box, Card, CardContent, ClickAwayListener, Fade, IconButton, ListItemIcon, MenuItem, MenuList, Paper, Popper, Slider, styled, Typography } from "@mui/material";
import { Input, PowerSettingsNew, Tune, VolumeOff, VolumeUp } from "@mui/icons-material";
import iconForSource from "./iconForSource";

interface ZoneProps {
    controllerId: number,
    zoneId: number
}

interface ZoneState {
    name: string;
    power: boolean;
    volume: number;
    maxVolume: number;
    muted: boolean;
    mediaBackground: string;
    sourcesAnchor: any;
    source: number,
    menuSources: number[];
}

const defaultState: ZoneState = {
    name: "",
    power: false,
    volume: 0,
    maxVolume: 100,
    muted: false,
    mediaBackground: null,
    sourcesAnchor: null,
    source: -1,
    menuSources: []
}

const ControlsContainer = styled('div')(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: theme.spacing(1)
}));

const VolumeContainer = styled(CardContent)(({theme}) => ({
    borderTop: "1px solid #0C1823",
    height: "52px",
    display: "flex",
    alignItems: "center",
    flexWrap: "nowrap",
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(1) + " !important"
}));

const ZoneCard: React.FC<ZoneProps> = ({controllerId, zoneId}) => {


    const { rnet } = useRNet();
    const [ state, setState ] = useState(defaultState);

    const onRNetUpdate = (event: Event) => {
        switch (event.type) {
            case "ZONE_STATE":
                if (event.controller_id == controllerId && event.zone_id == zoneId) {
                    let zone: Zone = rnet.getZone(controllerId, zoneId);
                    if (zone) {
                        let source: Source = rnet.getSource(zone.getSourceId());
                        setState({
                            ...state,
                            name: zone.getName(),
                            power: zone.getPower(),
                            volume: zone.getVolume(),
                            maxVolume: zone.getMaxVolume(),
                            muted: zone.getMute(),
                            source: zone.getSourceId(),
                            mediaBackground: source ? source.getMediaArtworkUrl() : null
                        });
                    }
                    else {
                        setState(defaultState);
                    }
                }
                break;
            case "SOURCE_STATE":
                if (event.source_id == state.source) {
                    let source = rnet.getSource(event.source_id);
                    setState({...state, mediaBackground: source.getMediaArtworkUrl()});
                }
                break;
        }
    };

    useEffect(() => {
        if (rnet) {
            let zone: Zone = rnet.getZone(controllerId, zoneId);
            if (zone) {
                let source: Source = rnet.getSource(zone.getSourceId());
                setState({
                    ...state,
                    name: zone.getName(),
                    power: zone.getPower(),
                    volume: zone.getVolume(),
                    maxVolume: zone.getMaxVolume(),
                    muted: zone.getMute(),
                    source: zone.getSourceId(),
                    mediaBackground: source ? source.getMediaArtworkUrl() : null
                });
            }
            else {
                setState(defaultState);
            }
            rnet.subscribe(onRNetUpdate);
        }
        else {
            setState(defaultState);
        }        
    }, [rnet]);

    useEffect(() => {
        return () => {
            if (rnet) rnet.unsubscribe(onRNetUpdate);
            setState(defaultState);
        }
    }, [])

    const openSources = (event: React.MouseEvent<HTMLElement>) => {
        setState({
            ...state,
            sourcesAnchor: event.currentTarget,
            menuSources: Array.from(rnet._sources.keys())
        });
    }

    const closeSources = () => {
        setState({
            ...state, sourcesAnchor: null
        });
    }

    const setSource = (id: number) => {
        rnet.getZone(controllerId, zoneId).setSourceId(id);
    }

    const volumeChange = (event, value) => {
        rnet.getZone(controllerId, zoneId).setVolume(value);
    }

    return (
        <>
        <Card sx={{position: "relative"}}>
            <Box sx={{
                backgroundImage: `url('${state.power && state.mediaBackground}')`,
                position: "absolute",
                opacity: 0.3,
                backgroundPosition: "center",
                backgroundSize: "cover",
                filter: "blur(8px)",
                top: -10, left: -10, right: -10, bottom: -10,
                overflow: "hidden"
            }} />
            <CardContent sx={{zIndex: 2, position: "relative"}}>
                <Typography variant="h6"><center>{state.name}</center></Typography>
                <ControlsContainer>
                    <IconButton
                        color={state.power ? "secondary" : "inherit"}
                        onClick={() => rnet.getZone(controllerId, zoneId).togglePower()}
                        aria-label="zone power">
                        <PowerSettingsNew />
                    </IconButton>
                    <IconButton
                        disabled={!state.power}
                        onClick={openSources}
                        aria-describedby={`sources-menu-${controllerId}-${zoneId}`}
                        aria-label="zone source">
                        <Input />
                    </IconButton>
                    <IconButton
                        aria-label="zone settings">
                        <Tune />
                    </IconButton>
                </ControlsContainer>
            </CardContent>
            <VolumeContainer>
                <IconButton
                    disabled={!state.power}
                    onClick={() => rnet.getZone(controllerId, zoneId).toggleMute()}
                    aria-label="zone mute">
                    
                    {state.muted &&
                        <VolumeOff sx={{color: "error.main"}} />||
                        <VolumeUp />}

                </IconButton>
                <Slider
                    color="secondary"
                    valueLabelDisplay="auto"
                    value={state.volume}
                    min={0}
                    max={state.maxVolume}
                    step={2}
                    disabled={!state.power}
                    onChange={volumeChange}
                    aria-label="zone volume"
                    sx={{
                        flex: 1,
                        marginLeft: 1
                    }}
                    />
            </VolumeContainer>
        </Card>
        <Popper
            id={`sources-menu-${controllerId}-${zoneId}`}
            anchorEl={state.sourcesAnchor}
            open={Boolean(state.sourcesAnchor)}
            sx={{zIndex: 5}}
            transition>
                {({TransitionProps}) => (
                <Fade {...TransitionProps}>
                    <Paper elevation={8} sx={{backgroundColor: "#172c3d"}}>
                        <ClickAwayListener onClickAway={closeSources}>
                            <MenuList>
                                {state.menuSources.map((id) => {
                                    const source: Source = rnet.getSource(id);
                                    const selected = state.source == id;
                                    const icon = React.createElement(
                                        iconForSource(source.getType()),
                                        {sx: {
                                            color: selected ? "secondary.main" : "inherit"
                                        }}
                                    );

                                    return (
                                        <MenuItem 
                                            key={`${id}`}
                                            sx={{color: selected ? "secondary.main" : "inherit"}}
                                            onClick={() => setSource(id)}>
                                            <ListItemIcon>{ icon }</ListItemIcon>
                                            <Typography variant="inherit">{source.getName()}</Typography>
                                        </MenuItem>
                                    );
                                })}
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Fade>
                )}
        </Popper>
        </>
    );
}

export default ZoneCard;
