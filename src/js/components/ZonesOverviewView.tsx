import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import {Typography, CircularProgress, Box} from "@mui/material";

import AppBar from "./AppBar"
import Container from "./Container";
import ZoneCard from "./ZoneCard";

import { useRNet } from "../rnet/RNetContext";
import { Event } from "../rnet/RNet";

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
        { !state.connected && 
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
        ||
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
        </>
    );
}

export default ZonesOverview;
