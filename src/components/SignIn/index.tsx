import { useRef, useState } from "react";
import { useLoginContext } from "@/hooks/useLoginContext";

import { ConfigProvider, Modal, Button, InputRef } from "antd";
import { CgUser } from "react-icons/cg";
import { MdOutlinePassword } from "react-icons/md";

import InputElement from "../InputElement";

const SignIn = () => {
    const { signInModalState, setLoginModalState, setSignInModalState, signInUser } = useLoginContext();
    const usernameRef = useRef<InputRef>(null);
    const [usernameState, setUsernameState] = useState("");
    const [pwdState, setPwdState] = useState("");
    const [errorState, setErrorState] = useState(false);

    const signInAction = async () => {
        if (!usernameState || !pwdState) return;

        const action = await signInUser({
            username: usernameState,
            password: pwdState
        });

        switch (action.code) {
            case 200:
                setUsernameState("");
                setPwdState("");
                setSignInModalState({
                    active: false,
                    closable: false
                });
                break;

            case 409:
            case 501:
                setErrorState(true);
                setTimeout(() => setErrorState(false), 3500);
                break;                
            
            default:
                break;
        }

    };

    const showLoginModal = () => {
        setSignInModalState({
            active: false,
            closable: false
        });
        return setLoginModalState({
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
                title="Cadastre-se" 
                open={signInModalState.active}
                closable={false}
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
                        onEnterPress={signInAction}
                        inputState={pwdState}
                        setInputState={setPwdState}
                    />
                </div>
                <div className="flex gap-2 mt-2">
                    <Button type="primary" onClick={() => signInAction()}>Cadastrar-se</Button>
                    <Button type="primary" onClick={() => showLoginModal()}>Já tenho conta</Button>
                </div>
            </Modal>
        </ConfigProvider>
    );
};

export default SignIn;