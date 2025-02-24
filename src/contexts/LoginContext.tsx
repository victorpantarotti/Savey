import { createContext, ReactElement, SetStateAction, useEffect, useState } from "react";
import { getUserStorage } from "@/utils/login";

interface LoginContextInterface {
    user: UserData | null,
    setUser: React.Dispatch<SetStateAction<UserData | null>>,
    loginModalState: IloginModalState,
    setLoginModalState: React.Dispatch<SetStateAction<IloginModalState>>,
    signInModalState: IloginModalState,
    setSignInModalState: React.Dispatch<SetStateAction<IloginModalState>>
}

interface LoginProviderProps {
    children: ReactElement
}

interface IloginModalState {
    active: boolean,
    closable: boolean
}

export interface UserData {
    username: string
    uuid: string
}

export const LoginContext = createContext<LoginContextInterface>({} as LoginContextInterface);
LoginContext.displayName = "Login";

export const LoginProvider = ({ children }: LoginProviderProps) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [loginModalState, setLoginModalState] = useState<IloginModalState>({
        active: false,
        closable: false
    });
    const [signInModalState, setSignInModalState] = useState<IloginModalState>({
        active: false,
        closable: false
    });

    useEffect(() => {
        const localUser = getUserStorage();
        
        !localUser 
            ? setLoginModalState({
                active: true,
                closable: false
            }) 
            : !user 
                ? setUser(localUser)
                : "" 
    }, [user]);

    return (
        <LoginContext.Provider value={{ user, setUser, loginModalState, setLoginModalState, signInModalState, setSignInModalState }}>
            {children}
        </LoginContext.Provider>
    );
};