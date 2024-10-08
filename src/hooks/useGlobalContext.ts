import { GlobalContext } from "@/contexts/GlobalContext";
import { useContext } from "react";

export const useGlobalContext = () => {
    const { alertState, setAlertState } = useContext(GlobalContext);

    return {
        alertState,
        setAlertState
    };
};