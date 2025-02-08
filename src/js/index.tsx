import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import { RNetProvider } from './rnet/RNetContext';

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RNetProvider>
            <App />
        </RNetProvider>
    </React.StrictMode>
);
