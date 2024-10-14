import { useVideosContext } from "@/hooks/useVideosContext";
import { useEffect, useState } from "react";
import utils from "@/utils";

import { Modal, Button } from "antd";
import InputElement from "@/components/InputElement";
import { CgMathPlus } from "react-icons/cg";

const AddVideo = () => {
    const { addVideoState, setAddVideoState, videoData, setVideoData } = useVideosContext();
    const [inputState, setInputState] = useState("");
    
    useEffect(() => setInputState(""), []);
    useEffect(() => setInputState(""), [videoData]);

    const handleCancel = () => setAddVideoState(false);

    const handleAddVideo = () => {
        if (inputState === null || !inputState) return;
        const { valid, id, lastTime } = utils.isYoutubeURL(inputState);

        if (valid) return setVideoData({ id, lastTime });
        return;
    };

    return (
        <Modal 
            title="Adicionar vídeo"
            open={addVideoState}
            onCancel={handleCancel}
            footer={null}
        >
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