import { useVideosContext } from "@/hooks/useVideosContext";
import { VideosObject } from "@/contexts/VideosContext";
import { useState } from "react";

import { Modal, Button } from "antd";
import { FaList } from "react-icons/fa";
import InputElement from "@/components/InputElement";

import styled from "styled-components";

const Warning = styled.p`
    margin-top: -10px;
    font-size: 12px;
`;

const SetOrder = () => {
    const { videos, customOrder, setCustomOrder, changeVideosOrder } = useVideosContext();
    const [inputState, setInputState] = useState("");

    const handleCancel = () => setCustomOrder({
        active: false,
        video: {} as VideosObject
    });

    const setOrder = () => {
        if (inputState === null || !inputState) return;
        if (Number(inputState) >= 0 && Number(inputState) < videos.length) {
            setCustomOrder({ active: false, video: {} as VideosObject});
            setInputState("");
            return changeVideosOrder(customOrder.video.order, Number(inputState));
        }
        return;
    };

    return (
        <Modal 
            title="Posição customizada"
            open={customOrder.active}
            onCancel={handleCancel}
            footer={null}
        >
            <Warning>Coloque o seu vídeo na posição que preferir!</Warning>
            <InputElement
                placeholder="Digite a nova posição" 
                prefix={<FaList />} 
                onEnterPress={setOrder}
                inputState={inputState}
                setInputState={setInputState} 
            />
            <Button type="primary" style={{ marginTop: "8px" }} onClick={setOrder}>Salvar</Button>
        </Modal>
    )
};

export default SetOrder;