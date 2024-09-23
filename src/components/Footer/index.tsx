import { usePreferencesContext } from "@/hooks/usePreferencesContext";
import styles from "./Footer.module.css";

const Footer = () => {
    const { user } = usePreferencesContext();

    return (
        <footer className={styles.footer}>
            <h3 className={styles.text}>victorpantarotti • user: {user} • :)</h3>
        </footer>
    )
};

export default Footer;