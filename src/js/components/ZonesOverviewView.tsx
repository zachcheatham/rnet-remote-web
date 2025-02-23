import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import {Typography, CircularProgress, Box, Button, Stack} from "@mui/material";

import AppBar from "./AppBar"
import Container from "./Container";
import ZoneCard from "./ZoneCard";

import { useRNet } from "../rnet/RNetContext";
import { Event } from "../rnet/RNet";
import AddZoneDialog from "./AddZoneDialog";

interface ZonesOverviewState {
    connected: boolean;
    showConnectionMessage: boolean;
    serverName: string;
    zones: number[][];
}

const defaultState: ZonesOverviewState = {
    connected: false,
    showConnectionMessage: false,
    serverName: "RNet: Connecting...",
    zones: []
}

const LoadingHolder = styled('div')({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    textAlign: "center"
});

const ZonesOverview: React.FC = () => {

    const { rnet } = useRNet();
    const [ state, setState ] = useState(defaultState);
    const [ addZoneOpen, setAddZoneOpen ] = useState(false);

    const onRNetUpdate = (event: Event) => {
        switch (event.type) {
            case "SERVER_PROPERTY":
            case "READY":
            case "INDEX_RECEIVED":
                setState({...state,
                    serverName: rnet.getName(),
                    connected: rnet.isConnected(),
                    zones: rnet.getZoneIndex()
                });
                break;
            case "DISCONNECTED":
                setState({...state, connected: false, showConnectionMessage: true});
        }
    };

    const onAddZone = (controllerId: number, zoneId: number, zoneName: string) => {
        
    };

    const openAddZone = () => {setAddZoneOpen(true)}
    const closeAddZone = () => {setAddZoneOpen(false)}

    useEffect(() => {
        if (rnet) {
            setState({
                ...state,
                connected: rnet.isConnected(),
                showConnectionMessage: rnet.getZoneIndex() !== null,
                serverName: rnet.isConnected() ? rnet.getName() : state.serverName,
            });
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

    return (
        <>
        <AppBar serverName={state.serverName} connected={state.connected} />
        { !state.connected ?
            <LoadingHolder>
                <Box sx={{textAlign: "center"}}>
                    <CircularProgress size={50} color="secondary"/>
                    {state.showConnectionMessage &&
                        <Typography sx={{marginTop: 2}}>
                            Unable to connect. Retrying...
                        </Typography>
                    }
                    
                </Box>
            </LoadingHolder>
        : state.zones.length == 0 ? 
            <LoadingHolder>
                <Stack spacing={2}>
                    <Typography>
                        No Configured Zones
                    </Typography>
                    <Button color="secondary" variant="outlined" onClick={openAddZone}>Add Zone</Button>
                </Stack>
            </LoadingHolder>
        :
            <Container maxWidth={false}>
                <Box sx={{display: "grid", gap: 2,
                    gridTemplateColumns: "repeat( auto-fit,minmax(250px,1fr) )"
                }}>
                    {state.zones.map((index) => {
                        return <ZoneCard key={`${index[0]}-${index[1]}`} controllerId={index[0]} zoneId={index[1]} />;
                    })}
                </Box>
            </Container>
        }
        <AddZoneDialog onCloseCallback={closeAddZone} open={addZoneOpen} addedCallback={onAddZone}  />
        </>
    );
}

export default ZonesOverview;
