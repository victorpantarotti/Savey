import { AlertProps } from "@/components/Alert";
import React, { createContext, ReactElement, SetStateAction, useState } from "react";

interface GlobalContextInterface {
    alertState: AlertStateInterface,
    setAlertState: React.Dispatch<SetStateAction<AlertStateInterface>>
}

interface GlobalProviderProps {
    children: ReactElement
}

interface AlertStateInterface {
    currentAlert: AlertProps,
    newAlert: AlertProps
}

export const GlobalContext = createContext<GlobalContextInterface>({} as GlobalContextInterface);
GlobalContext.displayName = "Global";

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const [alertState, setAlertState] = useState<AlertStateInterface>({
        currentAlert: {
            type: "success",
            message: "",
            time: ""
        },
        newAlert: {
            type: "success",
            message: "",
            time: ""
        },
    });

    return (
        <GlobalContext.Provider value={{ alertState, setAlertState }}>
            {children}
        </GlobalContext.Provider>
    )
} 