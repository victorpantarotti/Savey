import { useEffect, useRef, useState } from "react";
import { useVideosContext } from "@/hooks/useVideosContext";
import { isBrowser } from 'react-device-detect';
import utils from "@/utils";

import { Modal, Button, InputRef } from "antd";
import InputElement from "@/components/InputElement";
import { CgMathPlus } from "react-icons/cg";

const AddVideo = () => {
    const { addVideoState, setAddVideoState, addVideo } = useVideosContext();
    const [inputState, setInputState] = useState("");
    const inputRef = useRef<InputRef>(null);
    
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
            afterOpenChange={() => inputRef.current?.focus()}
        >
            {isBrowser && <p className="-mt-[10px] text-xs">Você também pode acessar essa tela usando: CTRL + Espaço ou CTRL + Q!</p>}
            <InputElement
                placeholder="Insira uma URL" 
                prefix={<CgMathPlus />} 
                onEnterPress={handleAddVideo}
                inputState={inputState}
                setInputState={setInputState}
                ref={inputRef}
            />
            <Button type="primary" style={{ marginTop: "8px" }} onClick={handleAddVideo}>Adicionar</Button>
        </Modal>
    )
};

export default AddVideo;