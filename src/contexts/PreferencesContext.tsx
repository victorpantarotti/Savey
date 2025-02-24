import { createContext, ReactElement, SetStateAction, useEffect, useState } from "react";

interface PreferencesContextInterface {
    theme: string,
    setTheme: React.Dispatch<SetStateAction<string>>
}

interface PreferencesProviderProps {
    children: ReactElement
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
    const [theme, setTheme] = useState(getTheme);

    useEffect(() => {
        const refreshTheme = () => {
            localStorage.setItem("theme", theme);
        };

        refreshTheme();
    }, [theme]);

    return (
        <PreferencesContext.Provider value={{ theme, setTheme }}>
            {children}
        </PreferencesContext.Provider>
    );
};