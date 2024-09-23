import { createContext, ReactElement, SetStateAction, useEffect, useState } from "react";

interface PreferencesProviderProps {
    children: ReactElement
}

interface PreferencesContextInterface {
    user: string,
    setUser: React.Dispatch<SetStateAction<string>>,
    theme: string,
    setTheme: React.Dispatch<SetStateAction<string>>
}

export const PreferencesContext = createContext<PreferencesContextInterface>({} as PreferencesContextInterface);
PreferencesContext.displayName = "Preferences";

const getTheme = () => {
    const theme = localStorage.getItem("theme");
    if (!theme) {
      // Default theme is taken as dark-theme
      localStorage.setItem("theme", "dark");
      return "dark";
    } else {
      return theme;
    }
};

export const PreferencesProvider = ({ children }: PreferencesProviderProps) => {
    const [user, setUser] = useState("vh"); 
    const [theme, setTheme] = useState(getTheme);

    useEffect(() => {
        const refreshTheme = () => {
            localStorage.setItem("theme", theme);
        };

        refreshTheme();
    }, [theme]);

    return (
        <PreferencesContext.Provider value={{ user, setUser, theme, setTheme }}>
            {children}
        </PreferencesContext.Provider>
    );
};