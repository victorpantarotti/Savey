import { ChangeEvent, forwardRef, ReactElement, SetStateAction } from "react";
import { Input, InputRef } from "antd";

interface InputElementProps {
    type?: string,
    placeholder: string,
    prefix?: ReactElement | null,
    status?: string,
    onEnterPress?: () => void,
    inputState: string,
    setInputState: React.Dispatch<SetStateAction<string>>
}

const InputElement = forwardRef<InputRef, InputElementProps>(({ type = "text", placeholder, prefix = null, status, onEnterPress = () => {}, inputState, setInputState }, ref) => {
    let obj = {
        placeholder: placeholder,
        prefix: prefix,
        value: inputState,
        onChange: (e: ChangeEvent<HTMLInputElement>) => setInputState(e.target.value), 
        onKeyDown: (e: any) => e.keyCode === 13 || e.keyCode === 108 ? onEnterPress() : "",
        ref: ref,
    }
    
    if (status) Object.assign(obj, {
        status: status
    });
    
    return type === "password"
        ? <Input.Password {...obj} />
        : <Input type={type} {...obj} />;
});

InputElement.displayName = "InputElement";

export default InputElement;