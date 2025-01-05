import { forwardRef, ReactElement, SetStateAction } from "react";
import { Input, InputRef } from "antd";

interface InputElementProps {
    placeholder: string,
    prefix?: ReactElement | null,
    onEnterPress: () => void,
    inputState: string,
    setInputState: React.Dispatch<SetStateAction<string>>
}

const InputElement = forwardRef<InputRef, InputElementProps>(({ placeholder, prefix = null, onEnterPress, inputState, setInputState }, ref) => {
    return (
        <Input
            placeholder={placeholder} 
            prefix={prefix}
            value={inputState}
            onChange={(e) => setInputState(e.target.value)} 
            onKeyDown={(e) => e.keyCode === 13 || e.keyCode === 108 ? onEnterPress() : ""}
            ref={ref}
        />
    )
});

InputElement.displayName = "InputElement";

export default InputElement;