import { ReactElement } from "react";
import styled from "styled-components";

interface DropdownButtonProps {
    icon: ReactElement,
    text: string,
    onClick: (action: void) => void
}

const Container = styled.div`
    display: flex;
    align-items: center;
`;

const Label = styled.span`
    margin-left: 5px;
`;

const DropdownButton = ({ icon, text, onClick }: DropdownButtonProps) => {
    return (
        <a onClick={(e) => {
            e.preventDefault();
            onClick();
        }}>
            <Container>
                {icon} <Label>{text}</Label>
            </Container>
        </a>
    );
};

export default DropdownButton;