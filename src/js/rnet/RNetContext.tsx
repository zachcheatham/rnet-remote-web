import React, { createContext, useContext, useState } from "react";

import { RNet, Event } from "./RNet";

interface RNetProviderType {
    setServer: (host: string, port: number) => void;
    rnet: RNet;
}

const RNetContext = createContext<(RNetProviderType) | undefined>(undefined);

const RNetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [ rnet, setRNet ] = useState<RNet>(null);

    const setServer = (host: string, port: number) => {

        if (rnet && rnet.isConnected()) {
            rnet.destroy();
            setRNet(null);
        }

        let newRNet = new RNet(host, port, onUpdate);
        newRNet.connect();

        setRNet(newRNet);
    }

    const onUpdate = (event: Event) => {
        // console.log(`[Debug] Internal received event: ${event.type}`);
    }
    
    return (
        <RNetContext.Provider value={{ rnet, setServer }}>
            {children}
        </RNetContext.Provider>
    );
};

const useRNet = () => {
    const context = useContext(RNetContext);
    if (!context) { throw new Error("useRNet must be used with an RNetProvider!");}
    return context;
}

export { RNetProvider, useRNet };