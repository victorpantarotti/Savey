import { useVideosContext } from "@/hooks/useVideosContext";
import { useState } from "react";
import utils from "@/utils";

import { ConfigProvider, Modal, Button } from "antd";
import InputElement from "@/components/InputElement";
import { FaRegClock } from "react-icons/fa";

import styled from "styled-components";
import { VideosObject } from "@/contexts/VideosContext";

const Warning = styled.p`
    margin-top: -10px;
    font-size: 12px;
`;

const Timestamp = () => {
    const { timestampState, setTimestampState, saveTimestamp } = useVideosContext();
    const [inputState, setInputState] = useState("");

    const handleCancel = () => setTimestampState({
        active: false,
        video: {}
    });

    const setTimestamp = () => {
        if (!inputState) {
            setTimestampState({ active: false, video: {}});
            setInputState("");
            return saveTimestamp(timestampState.video, "0h0m0s");
        }
        
        if (utils.checkTimeFormat(inputState)) {
            setTimestampState({ active: false, video: {}});
            setInputState("");
            return saveTimestamp(timestampState.video, inputState);
        }

        return;
    };

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
                title="Onde você parou?"
                open={timestampState.active}
                onCancel={handleCancel}
                footer={null}
            >
                <Warning>Coloque o tempo no formato correto. Ex: "1h55m45s", "16m35s", "35s"</Warning>
                <InputElement 
                    placeholder="Digite o tempo" 
                    prefix={<FaRegClock />} 
                    onEnterPress={setTimestamp}
                    inputState={inputState}
                    setInputState={setInputState} 
                />
                <Button type="primary" style={{ marginTop: "8px" }} onClick={setTimestamp}>Salvar</Button>
            </Modal>
        </ConfigProvider>
    )
};

export default Timestamp;