import { Close } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React  from "react";
import { useAppContext } from "../AppContext";

interface SplitAppBarProps {
    title: string,
}

const SplitAppBar: React.FC<SplitAppBarProps> = ({title}) => {

    const { setSplitViewContent } = useAppContext();

    return (
        <AppBar position="relative">
            <Toolbar>
                
                <IconButton
                    sx={{marginRight: 1}}
                    aria-controls="main-options-menu"
                    aria-haspopup="true"
                    aria-label="more options"
                    onClick={() => setSplitViewContent(null)}
                >
                    <Close />
                </IconButton>
                <Typography variant="h6">
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default SplitAppBar;
