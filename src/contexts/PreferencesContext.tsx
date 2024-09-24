import { createContext, ReactElement, SetStateAction, useEffect, useState } from "react";

interface PreferencesProviderProps {
    children: ReactElement
}

interface PreferencesContextInterface {
    user: string,
    setUser: React.Dispatch<SetStateAction<string>>,
    theme: string,
    setTheme: React.Dispatch<SetStateAction<string>>,
    loginModalState: boolean,
    setLoginModalState: React.Dispatch<SetStateAction<boolean>>
}

interface IloginModalState {
    active: boolean,
    closable: boolean
}

export const PreferencesContext = createContext<PreferencesContextInterface>({} as PreferencesContextInterface);
PreferencesContext.displayName = "Preferences";

const getTheme = () => {
    const theme = localStorage.getItem("theme");
    if (!theme) {
      localStorage.setItem("theme", "dark");
      return "dark";
    } else {
      return theme;
    }
};

export const PreferencesProvider = ({ children }: PreferencesProviderProps) => {
    const [user, setUser] = useState(""); 
    const [theme, setTheme] = useState(getTheme);
    const [loginModalState, setLoginModalState] = useState<IloginModalState>({
        active: false,
        closable: false
    });

    useEffect(() => {
        const localUser = localStorage.getItem("user");
        !localUser ? setLoginModalState({
            active: true,
            closable: false
        }) : setUser(localUser);
    }, [user]);

    useEffect(() => {
        const refreshTheme = () => {
            localStorage.setItem("theme", theme);
        };

        refreshTheme();
    }, [theme]);

    return (
        <PreferencesContext.Provider value={{ user, setUser, theme, setTheme, loginModalState, setLoginModalState }}>
            {children}
        </PreferencesContext.Provider>
    );
};