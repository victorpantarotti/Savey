import { GlobalContext } from "@/contexts/GlobalContext";
import { useContext } from "react";

export const useGlobalContext = () => {
    const { alertState, setAlertState } = useContext(GlobalContext);

    // const createAlert = () => {
    //     if (alertState.currentAlert.message) {
    //         // remove it
    //     }
    // };

    return {
        alertState,
        setAlertState
    };
};