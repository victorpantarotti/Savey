import { useGlobalContext } from "@/hooks/useGlobalContext";

import Alert from "./Alert";

import styled from "styled-components";

const AlertBox = styled.div`
    width: 250px;
    position: fixed;
    top: 10px;
    left: 50%;
    top: 0;
    z-index: 2;
`;

const Alerts = () => {
    const { alerts } = useGlobalContext();
    
    return (
        <AlertBox>
            {
                alerts.length > 0
                ? alerts.map((alert) => {
                    return <Alert { ...alert } key={alert.id} />
                })
                : ""
            }
        </AlertBox>
    )
};

export default Alerts;