import { useRef, useState } from "react";
import { useLoginContext } from "@/hooks/useLoginContext";

import { ConfigProvider, Modal, Button, InputRef } from "antd";
import { CgUser } from "react-icons/cg";
import { MdOutlinePassword } from "react-icons/md";

import InputElement from "../InputElement";

const Login = () => {
    const { loginModalState, setLoginModalState, setSignInModalState, loginUser } = useLoginContext();
    const usernameRef = useRef<InputRef>(null);
    const [usernameState, setUsernameState] = useState("");
    const [pwdState, setPwdState] = useState("");
    const [errorState, setErrorState] = useState(false);

    const loginAction = async () => {
        if (!usernameState || !pwdState) return;

        const action = await loginUser({
            username: usernameState,
            password: pwdState
        });

        switch (action.code) {
            case 200:
                setUsernameState("");
                setPwdState("");
                setLoginModalState({
                    active: false,
                    closable: false
                });
                break;

            case 401:
            case 404:
                setErrorState(true);
                setTimeout(() => setErrorState(false), 3500);
                break;                
            
            default:
                break;
        }
    };

    const handleCancel = () => {
        if (loginModalState.closable) {
            return setLoginModalState({
                active: false,
                closable: false
            });
        }
    }

    const showSignInModal = () => {
        setLoginModalState({
            active: false,
            closable: false
        });
        return setSignInModalState({
            active: true,
            closable: false
        });
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
                afterOpenChange={() => usernameRef.current?.focus()}
            >
                <div className="flex flex-col gap-1">
                    <InputElement
                        placeholder="Digite seu usuário" 
                        prefix={<CgUser />}
                        status={errorState ? "error" : ""}
                        inputState={usernameState}
                        setInputState={setUsernameState}
                        ref={usernameRef}
                        />
                    <InputElement
                        type="password"
                        placeholder="Digite sua senha"
                        prefix={<MdOutlinePassword />}
                        status={errorState ? "error" : ""}
                        onEnterPress={loginAction}
                        inputState={pwdState}
                        setInputState={setPwdState}
                    />
                </div>
                <div className="flex gap-2 mt-2">
                    <Button type="primary" onClick={loginAction}>Logar</Button>
                    <Button type="primary" onClick={() => showSignInModal()}>Cadastrar-se</Button>
                </div>
            </Modal>
        </ConfigProvider>
    );
};

export default Login;