import { AlertProps } from "@/components/Alerts/Alert";
import { GlobalContext } from "@/contexts/GlobalContext";
import { useContext } from "react";

export const useGlobalContext = () => {
    const { loading, setLoading, alerts, setAlerts } = useContext(GlobalContext);

    const showLoading = (action: "show" | "hide" | "reset") => {
        switch (action) {
            case "show":
                return setLoading({ active: true, hide: false });
            case "hide":
                return setLoading({ active: true, hide: true });
            case "reset":
                return setLoading({ active: false, hide: false });
            default:
                return;
        }
    };

    const createAlert = ({ type, message, duration }: Omit<AlertProps, "id">) => setAlerts([
        ...alerts,
        {
            id: new Date().getTime(),
            type,
            message,
            duration
        }
    ]);

    const delAlert = (id: number) => setAlerts(alerts.filter((a) => a.id !== id));

    return {
        loading,
        showLoading,
        alerts,
        createAlert,
        delAlert
    };
};