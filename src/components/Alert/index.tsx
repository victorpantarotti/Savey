import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import styles from "./Alert.module.css";
import styled from "styled-components";

export interface AlertProps {
    type: "success" | "fail",
    message: string,
    time: string,
    outState?: boolean
}

const AlertContainer = styled.div`
    position: relative;
    display: flex;
    gap: 5px;
    padding: 12px 12px 6px 12px;
`

const Alert = ({ type, message, time, outState }: AlertProps) => {

    const handleAnimationEnd = () => {
        if (outState) {
            
        }
    };

    return (
        <div className={`${styles.alert} ${styles[type]} ${outState ? styles.out : ""}`} onAnimationEnd={handleAnimationEnd}>
            <AlertContainer>
                <div>{type === "success" ? <FaCheckCircle /> : <FaExclamationCircle />}</div>
                <div><span>{message}</span></div>
                <button className={styles.close} onClick={() => {}}>
                    <IoMdClose size={18} color="white" />
                </button>
            </AlertContainer>
            <div className={styles.progressbar}>
                <div className={styles.inner} style={{ animationDuration: time, animationPlayState: "running" }}></div>
            </div>
        </div>
    );
};

export default Alert;