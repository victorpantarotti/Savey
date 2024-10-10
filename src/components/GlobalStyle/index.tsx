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
            "textColor": "white",
            "boxColor": "#333232",
            "boxShadowColor": "rgba(255, 255, 255, 0.30)"
        },
        "light": {
            "backgroundColor": "#DAE3DC",
            "textColor": "black",
            "boxColor": "#BBC4BD",
            "boxShadowColor": "rgba(0, 0, 0, 1)"
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
            --boxColor: ${currentTheme.boxColor};
            --boxShadowColor: ${currentTheme.boxShadowColor};
        }

        html, body { height: 100%; }

        body { font-family: "Sora"; }

        /* custom scroll */

        ::-webkit-scrollbar { width: 7px; }

        ::-webkit-scrollbar-track { background-color: black; }

        ::-webkit-scrollbar-thumb {
            background-color: #676767;
            border-radius: 10px;
        }

    `;

    return <Styled />;
}

export default GlobalStyle;