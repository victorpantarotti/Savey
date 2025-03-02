import { createContext, ReactElement, SetStateAction, useEffect, useState } from "react";
import { getUserStorage } from "@/utils/login";

interface LoginContextInterface {
    user: UserData | null,
    setUser: React.Dispatch<SetStateAction<UserData | null>>,
    loginModalState: IModalState,
    setLoginModalState: React.Dispatch<SetStateAction<IModalState>>,
    signInModalState: IModalState,
    setSignInModalState: React.Dispatch<SetStateAction<IModalState>>,
    changePwdModalState: IModalState,
    setChangePwdModalState: React.Dispatch<SetStateAction<IModalState>>
}

interface LoginProviderProps {
    children: ReactElement
}

interface IModalState {
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
    const [loginModalState, setLoginModalState] = useState<IModalState>({
        active: false,
        closable: false
    });
    const [signInModalState, setSignInModalState] = useState<IModalState>({
        active: false,
        closable: false
    });
    const [changePwdModalState, setChangePwdModalState] = useState<IModalState>({
        active: false,
        closable: true
    });

    useEffect(() => {
        const loadUser = async () => {
            try {
                const localUser = await getUserStorage();
    
                if (!localUser && user === null) {
                    setLoginModalState({
                        active: true,
                        closable: false
                    });
                } else if (user === null) {
                    setUser(localUser);
                }
            } catch (error) {
                console.error("Error loading user data:", error);
            }
        };
    
        loadUser();
    }, [user]);      

    return (
        <LoginContext.Provider value={{ user, setUser, loginModalState, setLoginModalState, signInModalState, setSignInModalState, changePwdModalState, setChangePwdModalState }}>
            {children}
        </LoginContext.Provider>
    );
};