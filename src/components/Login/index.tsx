// import styles from "./Login.module.css";

import { usePreferencesContext } from "@/hooks/usePreferencesContext";
import { ConfigProvider, Modal, Button } from "antd";
import { CgUser } from "react-icons/cg";
import InputElement from "../InputElement";
import { useState } from "react";

const Login = () => {
    const [inputState, setInputState] = useState("");
    const { loginModalState, setLoginModalState, changeUser } = usePreferencesContext();

    const loginAction = () => {
        if (!inputState) return;
        changeUser(inputState);
        setInputState("");
    };

    const handleCancel = () => {
        if (loginModalState.closable) {
            return setLoginModalState({
                active: false,
                closable: false
            });
        }
    }

    return (
        <ConfigProvider theme={{
            token: {
                colorBgElevated: "var(--boxColor)",
                colorText: "var(--textColor)",
                colorIcon: "var(--textColor)",
                colorIconHover: "var(--textColor)"
            }
        }}>
            <Modal 
                title="Logue-se" 
                open={loginModalState.active}
                closable={loginModalState.closable}
                onCancel={handleCancel}
                footer={null}
            >
                <InputElement 
                    placeholder="Digite seu usuário" 
                    prefix={<CgUser />} 
                    onEnterPress={loginAction}
                    inputState={inputState}
                    setInputState={setInputState} 
                />
                <Button type="primary" style={{ marginTop: "8px" }} onClick={loginAction}>Logar</Button>
            </Modal>
        </ConfigProvider>
    );
};

export default Login;