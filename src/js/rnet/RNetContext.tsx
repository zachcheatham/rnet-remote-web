import React, { createContext, useContext, useEffect, useState } from "react";

import RNet from "./RNet";

interface RNetState {
    rnet: RNet;
    setServer: (host: string, port: number) => void;
}

const RNetContext = createContext<RNetState | undefined>(undefined);

const RNetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [ rnet, setRNet ] = useState<RNet>(null);

    const setServer = async (host: string, port: number) => {
        
        if (rnet != null) {
            rnet.disconnect();
            setRNet(null);
        }

        let newRNet = new RNet(host, port);
        newRNet.connect();

        setRNet(newRNet);
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