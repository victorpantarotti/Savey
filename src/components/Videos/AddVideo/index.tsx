import { useEffect, useState } from "react";
import { useVideosContext } from "@/hooks/useVideosContext";
import { isBrowser } from 'react-device-detect';
import utils from "@/utils";

import { Modal, Button } from "antd";
import InputElement from "@/components/InputElement";
import { CgMathPlus } from "react-icons/cg";

import styled from "styled-components";

const Warning = styled.p`
    margin-top: -10px;
    font-size: 12px;
`;

const AddVideo = () => {
    const { addVideoState, setAddVideoState, addVideo } = useVideosContext();
    const [inputState, setInputState] = useState("");
    
    useEffect(() => setInputState(""), []);

    const handleCancel = () => setAddVideoState(false);

    const handleAddVideo = () => {
        if (inputState === null || !inputState) return;
        const { valid, id, lastTime } = utils.isYoutubeURL(inputState);

        if (valid) {
            setInputState("");
            return addVideo(id, lastTime);
        }
        return setInputState("");
    };

    return (
        <Modal 
            title="Adicionar vídeo"
            open={addVideoState}
            onCancel={handleCancel}
            footer={null}
        >
            {isBrowser && <Warning>Você também pode acessar essa tela usando: CTRL + Espaço!</Warning>}
            <InputElement
                placeholder="Insira uma URL" 
                prefix={<CgMathPlus />} 
                onEnterPress={handleAddVideo}
                inputState={inputState}
                setInputState={setInputState}
            />
            <Button type="primary" style={{ marginTop: "8px" }} onClick={handleAddVideo}>Adicionar</Button>
        </Modal>
    )
};

export default AddVideo;