import { ReactElement } from "react";
import { GlobalProvider } from "@/contexts/GlobalContext";
import { PreferencesProvider } from "@/contexts/PreferencesContext";
import { VideosProvider } from "@/contexts/VideosContext";

interface ContextProvidersProps {
    children: ReactElement
}

const ContextProviders = ({ children }: ContextProvidersProps) => {
    return (
        <GlobalProvider>
            <PreferencesProvider>
                <VideosProvider>
                    {children}
                </VideosProvider>
            </PreferencesProvider>
        </GlobalProvider>
    )
};

export default ContextProviders;