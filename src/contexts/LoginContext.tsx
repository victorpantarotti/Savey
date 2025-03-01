import { createContext, ReactElement, SetStateAction, useEffect, useState } from "react";
import { updateUserStorage } from "@/utils/login";

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
        updateUserStorage().then((localUser) => {
            if (!localUser && user === null) {
                setLoginModalState({
                    active: true,
                    closable: false
                });
            } else if (user === null) {
                setUser(localUser);
            }
        }).catch(error => {
            console.error("Error loading user data:", error);
        });
    }, [user]);    

    return (
        <LoginContext.Provider value={{ user, setUser, loginModalState, setLoginModalState, signInModalState, setSignInModalState }}>
            {children}
        </LoginContext.Provider>
    );
};