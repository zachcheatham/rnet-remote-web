import React, { useEffect, useState } from "react"

import AppBar from "./SplitAppBar"
import { Box, Divider, List, ListItem, ListItemButton, ListItemText, Switch, Typography } from "@mui/material";
import { useRNet } from "../rnet/RNetContext";
import { Event } from "../rnet/RNet";

interface SettingsHeaderProps {
    title: string
}

const SettingsHeader: React.FC<SettingsHeaderProps> = ({title}) => {
    return (
        <Typography color="secondary" variant="body2" sx={{marginLeft: 2, marginRight: 2, marginTop: 1}}>{title}</Typography>
    )
}

interface ControllerState {
    name: string;
    address: string;
    version: string;
}

const defaultState: ControllerState = {
    name: "Connecting...",
    address: "Connecting...",
    version: "Connecting..."
}

const AppSettingsView: React.FC = () => {

    const { rnet } = useRNet();
    const [ serverState, setServerState ] = useState<ControllerState>(defaultState);

    const onRNetUpdate = (event: Event) => {
        switch (event.type) {
            case "SERVER_PROPERTY":
            case "READY":
                setServerState({
                    name: rnet.getName(),
                    address: `${rnet.getHost()}:${rnet.getPort()}`,
                    version: rnet.getVersion()
                });
                break;
            case "DISCONNECTED":
                setServerState(defaultState);
        }
    };

    useEffect(() => {
        if (rnet) {
            setServerState({
                name: rnet.getName(),
                address: `${rnet.getHost()}:${rnet.getPort()}`,
                version: rnet.getVersion()
            });
            rnet.subscribe(onRNetUpdate);
        }
        else {
            setServerState(defaultState);
        }        
    }, [rnet]);

    return (
        <>
            <AppBar title="Settings"/>
            <Box sx={{flex: 1, overflow: 'auto'}}>
                {/* <List>
                    <ListItem>
                        <ListItemText primary="Card Artwork" secondary="Show media artwork on zone cards" />
                        <Switch color="secondary"/>
                    </ListItem>
                </List> */}
                <List subheader={<SettingsHeader title="Controller" />}>
                    <ListItem sx={{padding: 0}}>
                        <ListItemButton>
                            <ListItemText primary="Controller Name" secondary={serverState.name} />
                        </ListItemButton>
                    </ListItem>
                    <Divider component="li" />
                    <ListItem sx={{padding: 0}}>
                        <ListItemButton>
                            <ListItemText primary="Manage Sources" />
                        </ListItemButton>
                    </ListItem>
                </List>
                <List subheader={<SettingsHeader title="About" />}>
                    <ListItem>
                        <ListItemText primary="Web Application version" secondary="0.0.0-Beta 1" />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                        <ListItemText primary="Controller version" secondary={serverState.version} />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                        <ListItemText primary="Controller address" secondary={serverState.address}/>
                    </ListItem>
                    <Divider component="li" />
                </List>
            </Box>
        </>
    )
}

export default AppSettingsView;
