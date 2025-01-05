import { useRef, useState } from "react";
import { usePreferencesContext } from "@/hooks/usePreferencesContext";

import { ConfigProvider, Modal, Button, InputRef } from "antd";
import { CgUser } from "react-icons/cg";
import InputElement from "../InputElement";

// import styles from "./Login.module.css";

const Login = () => {
    const { loginModalState, setLoginModalState, changeUser } = usePreferencesContext();
    const [inputState, setInputState] = useState("");
    const inputRef = useRef<InputRef>(null);

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
                afterOpenChange={() => inputRef.current?.focus()}
            >
                <InputElement 
                    placeholder="Digite seu usuário" 
                    prefix={<CgUser />} 
                    onEnterPress={loginAction}
                    inputState={inputState}
                    setInputState={setInputState}
                    ref={inputRef}
                />
                <Button type="primary" style={{ marginTop: "8px" }} onClick={loginAction}>Logar</Button>
            </Modal>
        </ConfigProvider>
    );
};

export default Login;