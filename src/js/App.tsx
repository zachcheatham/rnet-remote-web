import React, { useEffect } from 'react';
import { ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline } from '@mui/material';

import ZonesOverviewView from "./components/ZonesOverviewView"

import theme from "./config/theme";
import { useRNet } from './rnet/RNetContext';

const App: React.FC = () => {

    const { setServer } = useRNet();

    useEffect(() => {
        setServer("127.0.0.1", 3001);
    }, []);

    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box sx={{
                    display: "flex",
                    height: "100vh",
                    width: "100vw",
                    flexDirection: "row",
                    flexWrap: "nowrap"
                }}>
                    <Box sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        overflow: "hidden"
                    }}>
                        <ZonesOverviewView />
                    </Box>
                    {false &&
                        <Box sx={{
                            flex: 1,
                            width: "400px",
                            maxWidth: "400px",
                            minWidth: "400px",
                            borderLeft: "1px solid #0a151e",
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            {/* <AppSettingsView /> */}
                        </Box>
                    }
                </Box>
            </ThemeProvider>
        </React.StrictMode>
    )
};

export default App;