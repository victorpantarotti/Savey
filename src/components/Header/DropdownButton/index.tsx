import { ReactElement } from "react";

interface DropdownButtonProps {
    icon: ReactElement,
    text: string,
    onClick: (action: void) => void
}

const DropdownButton = ({ icon, text, onClick }: DropdownButtonProps) => {
    return (
        <a onClick={(e) => {
            e.preventDefault();
            onClick();
        }}>
            <div className="flex items-center">
                {icon} <span className="ml-[5px]">{text}</span>
            </div>
        </a>
    );
};

export default DropdownButton;