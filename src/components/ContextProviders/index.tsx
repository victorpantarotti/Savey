import { ReactElement } from "react";
import { PreferencesProvider } from "@/contexts/PreferencesContext";
import { VideosProvider } from "@/contexts/VideosContext";

interface ContextProvidersProps {
    children: ReactElement
}

const ContextProviders = ({ children }: ContextProvidersProps) => {
    return (
        <PreferencesProvider>
            <VideosProvider>
                {children}
            </VideosProvider>
        </PreferencesProvider>
    )
};

export default ContextProviders;