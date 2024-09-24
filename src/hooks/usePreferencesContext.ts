import { PreferencesContext } from "@/contexts/PreferencesContext";
import { useContext } from "react";

export const usePreferencesContext = () => {
    const { user, setUser, theme, setTheme, loginModalState, setLoginModalState } = useContext(PreferencesContext);

    const changeTheme = () => theme === "dark" ? setTheme("light") : setTheme("dark");

    const changeUser = (user: string) => {
        localStorage.setItem("user", user);
        setUser(user);
        setLoginModalState(false);
    };

    return {
        user,
        setUser,
        theme,
        changeTheme,
        loginModalState,
        setLoginModalState,
        changeUser
    };
};