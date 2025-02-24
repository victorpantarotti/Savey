import { ReactElement } from "react";
import { GlobalProvider } from "@/contexts/GlobalContext";
import { PreferencesProvider } from "@/contexts/PreferencesContext";
import { LoginProvider } from "@/contexts/LoginContext";
import { VideosProvider } from "@/contexts/VideosContext";

interface ContextProvidersProps {
    children: ReactElement
}

const ContextProviders = ({ children }: ContextProvidersProps) => {
    return (
        <GlobalProvider>
            <PreferencesProvider>
                <LoginProvider>
                    <VideosProvider>
                        {children}
                    </VideosProvider>
                </LoginProvider>
            </PreferencesProvider>
        </GlobalProvider>
    )
};

export default ContextProviders;