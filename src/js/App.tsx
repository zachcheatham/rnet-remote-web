import React, { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline, Paper } from '@mui/material';

import ZonesOverviewView from "./components/ZonesOverviewView"

import theme from "./config/theme";
import { useRNet } from './rnet/RNetContext';
import { AppContext } from './AppContext';

const App: React.FC = () => {

    const { setServer } = useRNet();
    const [ splitViewContent, setSplitViewContent ] = useState<ReactNode>(null);

    useEffect(() => {
        setServer("127.0.0.1", 3001);
    }, []);

    return (
        <React.StrictMode>
            <AppContext.Provider value={{setSplitViewContent}}>
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
                        {Boolean(splitViewContent) &&
                            <Paper
                                square={true}
                                    sx={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "400px",
                                    maxWidth: "400px",
                                    minWidth: "400px",
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                {splitViewContent}
                            </Paper>
                        }
                    </Box>
                </ThemeProvider>
            </AppContext.Provider>
        </React.StrictMode>
    )
};

export default App;