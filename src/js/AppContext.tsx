import React, { createContext, useContext, ReactNode } from 'react';


interface AppContextProps {
    setSplitViewContent: (content: ReactNode) => void;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = (): AppContextProps => {
    return useContext(AppContext);
}