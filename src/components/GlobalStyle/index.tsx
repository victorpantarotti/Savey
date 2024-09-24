import { createGlobalStyle } from "styled-components";
import { usePreferencesContext } from "@/hooks/usePreferencesContext";

import Sora from "./fonts/Sora.ttf";
import AmsterdamTwo from "./fonts/amsterdam-two.ttf";

import './normalize.css';

const GlobalStyle = () => {
    const { theme } = usePreferencesContext();

    const themeStyles = {
        "dark": {
            "backgroundColor": "#212121",
            "textColor": "white"
        },
        "light": {
            "backgroundColor": "#e9f2eb",
            "textColor": "black"
        }
    };

    const currentTheme = themeStyles[theme as keyof object];

    const Styled = createGlobalStyle`
        @font-face {
            font-family: "Sora";
            src: local("Sora"), url(${Sora}), format("truetype");
            font-weight: normal;
            font-style: normal;
        }

        @font-face {
            font-family: "Amsterdam Two";
            src: local("Amsterdam Two"), local("AmsterdamTwo"), url(${AmsterdamTwo}), format("truetype");
            font-weight: normal;
            font-style: normal;
        }

        :root {
            --backgroundColor: ${currentTheme.backgroundColor};
            --textColor: ${currentTheme.textColor};
        }

        body { font-family: "Sora"; }

        .dark-theme {
            --backgroundColor: var(--dark-backgroundColor);
            --textColor: var(--dark-textColor);
        }

        .light-theme {
            --backgroundColor: var(--white-backgroundColor);
            --textColor: var(--white-textColor);
        }
    `;

    return <Styled />;
}

export default GlobalStyle;