import { FaArrowUp } from "react-icons/fa";
import styled from "styled-components";

const Button = styled.a`
    position: fixed;
    background-color: var(--boxColor);
    right: 50px;
    bottom: 50px;
    padding: 10px 15px 10px 15px;
    border-radius: 15px;
    z-index: 2;

    :hover { cursor: pointer; }

    @media screen and (max-width: 710px) {
        right: 20px;
    }
`;

const ScrollToTop = () => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        console.log('click')
        window.scrollTo({
            top: 0, 
            behavior: "smooth"
        });
    }

    return (
        <Button onClick={handleClick}>
            <FaArrowUp />
        </Button>
    )
};

export default ScrollToTop;