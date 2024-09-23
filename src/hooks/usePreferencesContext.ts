import { PreferencesContext } from "@/contexts/PreferencesContext";
import { useContext } from "react";

export const usePreferencesContext = () => {
    const { user, setUser, theme, changeTheme } = useContext(PreferencesContext);

    return {
        user,
        setUser,
        theme,
        changeTheme
    };
};