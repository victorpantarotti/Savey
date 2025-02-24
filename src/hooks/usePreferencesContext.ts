import { PreferencesContext } from "@/contexts/PreferencesContext";
import { useContext } from "react";

export const usePreferencesContext = () => {
    const { theme, setTheme } = useContext(PreferencesContext);

    const changeTheme = () => theme === "dark" ? setTheme("light") : setTheme("dark");

    return {
        theme,
        changeTheme
    };
};