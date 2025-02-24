import { useGlobalContext } from "@/hooks/useGlobalContext";
import { useEffect, useState } from "react";

import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import styles from "./Alert.module.scss";
import styled from "styled-components";

export interface AlertProps {
    id: number,
    type: "success" | "fail",
    message: string,
    duration: string
}

const AlertContainer = styled.div`
    position: relative;
    display: flex;
    gap: 5px;
    padding: 12px 18px 6px 12px;
`

const Alert = ({ id, type, message, duration }: AlertProps) => {
    const { delAlert } = useGlobalContext();
    const [getOut, setGetOut] = useState(false);
    
    const closeAlert = () => {
        setGetOut(false);
        return delAlert(id);
    };
    
    useEffect(() => {
        if (getOut) return closeAlert();
    }, [getOut]);

    return (
        <div 
            className={`
                ${styles.alert} 
                ${styles[type]} 
                ${getOut ? styles.out : ""}
            `}
        >
            <AlertContainer onAnimationEnd={closeAlert}>
                <div>{type === "success" ? <FaCheckCircle /> : <FaExclamationCircle />}</div>
                <div><span>{message}</span></div>
                <button className={styles.close} onClick={() => setGetOut(true)}>
                    <IoMdClose size={18} color="white" />
                </button>
            </AlertContainer>
            <div className={styles.progressbar}>
                <div 
                    className={styles.inner} 
                    style={{ animationDuration: duration, animationPlayState: "running" }} 
                    onAnimationEnd={() => setGetOut(true)} 
                />
            </div>
        </div>
    );
};

export default Alert;