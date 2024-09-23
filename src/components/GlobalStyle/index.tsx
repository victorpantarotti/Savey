import { createGlobalStyle } from "styled-components";
import { usePreferencesContext } from "@/hooks/usePreferencesContext";

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
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap');
        @font-face {
            font-family: 'Amsterdam Two';
            src: url('/amsterdam-two.ttf') format('truetype');
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