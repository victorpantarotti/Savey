import { useVideosContext } from "@/hooks/useVideosContext";
import { useEffect, useState } from "react";

import { Modal, Button } from "antd";
import InputElement from "@/components/InputElement";
import { CgSearch } from "react-icons/cg";

import styled from "styled-components";

const Warning = styled.p`
    margin-top: -10px;
    font-size: 12px;
`;

const Search = () => {
    const { searchState, setSearchState, filter, setFilter } = useVideosContext();
    const [inputState, setInputState] = useState(filter.filter);

    useEffect(() => search(), [inputState])
    
    const handleCancel = () => setSearchState(false);

    const search = (click?: boolean) => {
        if (inputState === null || !inputState) return setFilter({
            active: false,
            filter: ""
        });

        if (click) setSearchState(false);
        return setFilter({
            active: true,
            filter: inputState
        });
    };

    return (
        <Modal 
            title="Buscar vídeo"
            open={searchState}
            onCancel={handleCancel}
            footer={null}
        >
            <Warning>Você pode buscar por título, nome do canal ou duração!</Warning>
            <InputElement
                placeholder="Digite sua pesquisa" 
                prefix={<CgSearch />} 
                onEnterPress={() => search(true)}
                inputState={inputState}
                setInputState={setInputState} 
            />
            <Button type="primary" style={{ marginTop: "8px" }} onClick={() => search(true)}>Buscar</Button>
        </Modal>
    )
};

export default Search;