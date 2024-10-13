// import { useState } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import styles from "./Alert.module.css";
import styled from "styled-components";

export interface AlertProps {
    type: "success" | "fail",
    message: string,
    time: string,
    active: boolean,
    onTimeEnd: () => void
}

const AlertContainer = styled.div`
    position: relative;
    display: flex;
    gap: 5px;
    padding: 12px 12px 6px 12px;
`

const Alert = ({ type, message, time, active, onTimeEnd }: AlertProps) => {
    // const [firstRender, isFirstRender] = useState(true);

    // const onFirstRender = () => {
    //     isFirstRender(false);
    //     return "";
    // };

    const handleProgressbarEnd = () => onTimeEnd();

    return (
        <div 
            className={`
                ${styles.alert} 
                ${styles[type]} 
                ${
                    active ? styles.fadeIn : styles.fadeOut
                }
            `}
        >
            <AlertContainer>
                <div>{type === "success" ? <FaCheckCircle /> : <FaExclamationCircle />}</div>
                <div><span>{message}</span></div>
                <button className={styles.close} onClick={() => {}}>
                    <IoMdClose size={18} color="white" />
                </button>
            </AlertContainer>
            <div className={styles.progressbar}>
                <div className={styles.inner} style={{ animationDuration: time, animationPlayState: "running" }} onAnimationEnd={handleProgressbarEnd} />
            </div>
        </div>
    );
};

export default Alert;