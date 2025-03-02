import { useRef, useState } from "react";
import { useLoginContext } from "@/hooks/useLoginContext";

import { ConfigProvider, Modal, Button, InputRef } from "antd";
import { MdOutlinePassword } from "react-icons/md";

import InputElement from "../InputElement";

const UserInfo = () => {
    const { changePwdModalState, setChangePwdModalState, changeUserPassword } = useLoginContext();
    const usernameRef = useRef<InputRef>(null);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errorState, setErrorState] = useState(false);

    const changePwdAction = async () => {
        if (!oldPassword || !newPassword) return;

        const action = await changeUserPassword(oldPassword, newPassword);

        switch (action.code) {
            case 200:
                setOldPassword("");
                setNewPassword("");
                setChangePwdModalState({
                    active: false,
                    closable: true
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

    const handleCancel = () => setChangePwdModalState({
        active: false,
        closable: true
    });

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
                title="Troque sua senha" 
                open={changePwdModalState.active}
                closable={changePwdModalState.closable}
                onCancel={handleCancel}
                footer={null}
                afterOpenChange={() => usernameRef.current?.focus()}
            >
                <div className="flex flex-col gap-1">
                    <InputElement
                        type="password"
                        placeholder="Digite sua senha antiga" 
                        prefix={<MdOutlinePassword />}
                        status={errorState ? "error" : ""}
                        inputState={oldPassword}
                        setInputState={setOldPassword}
                        ref={usernameRef}
                    />
                    <InputElement
                        type="password"
                        placeholder="Digite sua nova senha"
                        prefix={<MdOutlinePassword />}
                        status={errorState ? "error" : ""}
                        onEnterPress={changePwdAction}
                        inputState={newPassword}
                        setInputState={setNewPassword}
                    />
                </div>
                <div className="flex gap-2 mt-2">
                    <Button type="primary" onClick={changePwdAction}>Trocar senha</Button>
                </div>
            </Modal>
        </ConfigProvider>
    );
};

export default UserInfo;