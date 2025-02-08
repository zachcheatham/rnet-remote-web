import React, { useEffect } from 'react';
import { ThemeProvider } from "@mui/material/styles";
import theme from "./config/theme";
import { CssBaseline } from '@mui/material';

// import RNet from "./rnet/Rnet";
import ZonesOverviewView from "./components/ZonesOverviewView"

import * as styles from "../style/app.scss";
import { useRNet } from './rnet/RNetContext';
const App: React.FC = () => {

    const { rnet, setServer } = useRNet();

    useEffect(() => {
        setServer("127.0.0.1", 3000);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className={styles.root}>
                <div className={styles.mainViewContainer}>
                    <ZonesOverviewView />
                </div>
                {false &&
                    <div className={styles.splitViewContainer}>
                        {/* <AppSettingsView /> */}

                        

                    </div>
                }
            </div>
        </ThemeProvider>
    )
};

export default App;