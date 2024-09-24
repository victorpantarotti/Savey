import { ReactElement, SetStateAction } from "react";
import { ConfigProvider, Input } from "antd";

interface InputElementProps {
    placeholder: string,
    prefix?: ReactElement | null,
    onEnterPress: () => void,
    inputState: string,
    setInputState: React.Dispatch<SetStateAction<string>>
}

const InputElement = ({ placeholder, prefix = null, onEnterPress, inputState, setInputState }: InputElementProps) => {
    return (
        <ConfigProvider theme={{
            token: {
                colorBgContainer: "var(--backgroundColor)",
                colorTextPlaceholder: "var(--textColor)",
                colorBorder: "var(--backgroundColor)"
            },
            components: {
                Input: {
                    activeBg: "var(--boxColor)"
                }
            }
        }}>
            <Input 
                placeholder={placeholder} 
                prefix={prefix}
                value={inputState}
                onChange={(e) => setInputState(e.target.value)} 
                onKeyDown={(e) => e.code === 'Enter' ? onEnterPress() : ""}
            />
        </ConfigProvider>
    )
};

export default InputElement;