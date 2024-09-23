import { PreferencesContext } from "@/contexts/PreferencesContext";
import { useContext } from "react";

export const usePreferencesContext = () => {
    const { user, setUser, theme, setTheme } = useContext(PreferencesContext);

    const changeTheme = () => theme === "dark" ? setTheme("light") : setTheme("dark");

    return {
        user,
        setUser,
        theme,
        changeTheme
    };
};