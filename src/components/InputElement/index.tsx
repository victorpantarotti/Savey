import { ReactElement, SetStateAction } from "react";
import { Input } from "antd";

interface InputElementProps {
    placeholder: string,
    prefix?: ReactElement | null,
    onEnterPress: () => void,
    inputState: string,
    setInputState: React.Dispatch<SetStateAction<string>>
}

const InputElement = ({ placeholder, prefix = null, onEnterPress, inputState, setInputState }: InputElementProps) => {
    return (
        <Input 
            placeholder={placeholder} 
            prefix={prefix}
            value={inputState}
            onChange={(e) => setInputState(e.target.value)} 
            onKeyDown={(e) => e.keyCode === 13 || e.keyCode === 108 ? onEnterPress() : ""}
        />
    )
};

export default InputElement;