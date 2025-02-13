import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import { RNetProvider } from './rnet/RNetContext';

const root = createRoot(document.getElementById('root'));
root.render(
    <RNetProvider>
        <App />
    </RNetProvider>
);
