import { useEffect, useRef, useState } from "react";
import { useVideosContext } from "@/hooks/useVideosContext";

import { isBrowser } from "react-device-detect";

import { Modal, Button, InputRef } from "antd";
import { CgSearch } from "react-icons/cg";

import InputElement from "@/components/InputElement";

const Search = () => {
    const { searchState, setSearchState, filter, setFilter } = useVideosContext();
    const [inputState, setInputState] = useState(filter.filter);
    const inputRef = useRef<InputRef>(null);

    useEffect(() => search(), [inputState]);
    
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
            afterOpenChange={() => inputRef.current?.focus()}
        >
            <p className="-mt-[10px] text-xs">Atalhos: {">"}: maior que; {"<"}: menor que.</p>
            {isBrowser && <p className="-mt-[10px] text-xs">Você também pode acessar essa tela usando: CTRL + K!</p>}
            <InputElement
                placeholder="Digite sua pesquisa" 
                prefix={<CgSearch />} 
                onEnterPress={() => search(true)}
                inputState={inputState}
                setInputState={setInputState}
                ref={inputRef}
            />
            <p className="mt-[2px] px-2 text-[10px] text-gray-300">Você pode utilizar estes atalhos ao mesmo tempo enquanto pesquisa pelo título e/ou nome do canal! Não existe ordem específica para colocá-los! Ex: {`">10m jogos"`}</p>
            <Button type="primary" style={{ marginTop: "8px" }} onClick={() => search(true)}>Buscar</Button>
        </Modal>
    )
};

export default Search;