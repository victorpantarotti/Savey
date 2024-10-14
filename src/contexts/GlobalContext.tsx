import React, { createContext, ReactElement, SetStateAction, useState } from "react";
import { AlertProps } from "@/components/Alerts/Alert";

interface GlobalContextInterface {
    loading: LoadingInterface,
    setLoading: React.Dispatch<SetStateAction<LoadingInterface>>,
    alerts: AlertProps[],
    setAlerts: React.Dispatch<SetStateAction<AlertProps[]>>
}

interface GlobalProviderProps {
    children: ReactElement
}

interface LoadingInterface {
    active: boolean,
    hide: boolean
}

export const GlobalContext = createContext<GlobalContextInterface>({} as GlobalContextInterface);
GlobalContext.displayName = "Global";

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const [loading, setLoading] = useState<LoadingInterface>({
        active: false,
        hide: false
    });
    const [alerts, setAlerts] = useState<AlertProps[]>([]);
    
    return (
        <GlobalContext.Provider value={{ 
            loading, 
            setLoading,
            alerts,
            setAlerts
        }}>
            {children}
        </GlobalContext.Provider>
    )
} 