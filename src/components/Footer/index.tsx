import { useLoginContext } from "@/hooks/useLoginContext";

import styles from "./Footer.module.scss";

const Footer = () => {
    const { user } = useLoginContext();

    return (
        <footer className={styles.footer}>
            <h3 className={styles.text}>victorpantarotti • user: {user?.username ?? "?"} • :)</h3>
        </footer>
    )
};

export default Footer;