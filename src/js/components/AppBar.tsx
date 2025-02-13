import React, { useState }  from "react";

import {
    Button, IconButton, Menu, MenuItem, AppBar,
    Toolbar, Typography,
    styled
} from "@mui/material";

import {
    VolumeOff, MoreVert, PowerSettingsNew
} from "@mui/icons-material";
import { useAppContext } from "../AppContext";
import AppSettingsView from "./AppSettingsView";


interface RnetAppBarProps {
    serverName: string;
    connected: boolean;
}

const AppBarButton = styled(Button)(({theme}) => ({
    marginLeft: theme.spacing(1),
    color: theme.palette.text.primary,
    '> svg': {
        marginRight: theme.spacing(1)
    },
}))

const RnetAppBar: React.FC<RnetAppBarProps> = ({serverName, connected}) => {

    const [ menuAnchor, setMenuAnchor ] = useState(null);
    const { setSplitViewContent } = useAppContext();

    return (
        <AppBar position="relative">
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow: 1}}>
                    {serverName}
                </Typography>
                {connected && (
                    <>
                        <AppBarButton aria-label="mute all zones">
                            <VolumeOff/> Mute All Zones
                        </AppBarButton>
                        <AppBarButton aria-label="all zones power control">
                            <PowerSettingsNew /> All On/Off
                        </AppBarButton>
                    </>
                )}
                <IconButton
                    aria-controls="main-options-menu"
                    aria-haspopup="true"
                    aria-label="more options"
                    onClick={(e) => setMenuAnchor(e.currentTarget)}
                >
                    <MoreVert />
                </IconButton>
                <Menu
                    id="main-options-menu"
                    anchorEl={menuAnchor}
                    keepMounted
                    open={Boolean(menuAnchor)}
                    onClose={() => setMenuAnchor(null)}
                >
                    {connected && (
                        <>
                        <MenuItem>Add Zone</MenuItem>
                        <MenuItem>Change Controller</MenuItem>
                        </>
                    )}
                    <MenuItem
                        onClick={() => {setMenuAnchor(null); setSplitViewContent(<AppSettingsView />)}}>
                        Settings
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default RnetAppBar;
