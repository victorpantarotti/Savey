import { useContext } from "react";
import { LoginContext } from "@/contexts/LoginContext";

import { v4 as uuidv4 } from "uuid";

import firebaseConfig from "@/utils/initDatabase";
import { get, getDatabase, ref, set, update } from "firebase/database";

import { VideosObject } from "@/contexts/VideosContext";

import { delUserStorage, setUserStorage } from "@/utils/login";
import { encryptObject, decryptObject, IEncryptedData } from "@/utils/encryption";

interface UserLoginObject {
    username: string,
    password: string
}

interface UserObject {
    username: string,
    password: IEncryptedData
    videos: VideosObject[]
}

interface FindUserResponse {
    uuid: string | null, 
    data: UserObject | null
}

interface AuthResponses {
    code: 200 | 401 | 404 | 409 | 501
}
/*
    200 - OK
    401 - Unauthorized
    404 - Not Found
    409 - Conflict
    501 - Not Implemented
*/

export const useLoginContext = () => {
    const { user, setUser, loginModalState, setLoginModalState, signInModalState, setSignInModalState, changePwdModalState, setChangePwdModalState } = useContext(LoginContext);
    const db = getDatabase(firebaseConfig);

    const findUser = async (username: string): Promise<FindUserResponse> => {
        let userUUID;
        let userData;

        await get(ref(db, "/")).then(async (snap) => {
            userUUID = Object.keys(snap.val()).find(key => snap.val()[key].username === username);
            userData = snap.val()[userUUID || ""];
        });
        
        if (!userUUID) return { uuid: null, data: null };
        return { uuid: userUUID, data: userData! };
    }

    const loginUser = async (user: UserLoginObject): Promise<AuthResponses> => {
        try {
            const userData = await findUser(user.username.toLowerCase());
    
            if (!userData?.uuid) return { code: 404 };
    
            try {
                const { password } = await decryptObject(userData.data?.password!);
    
                if (password === user.password) {
                    setUserStorage({ username: userData.data?.username!, uuid: userData.uuid! });
                    setUser({ username: userData.data?.username!, uuid: userData.uuid! });
                    return { code: 200 };
                }
                
                return { code: 401 };
            } catch (err) {
                console.error("[loginUser][decryptObject]:", err);
                return { code: 401 };
            }
        } catch (err) {
            return { code: 404 };
        }
    };    

    const signInUser = async (user: UserLoginObject): Promise<AuthResponses> => {
        const userSearch = await findUser(user.username);

        if (userSearch.uuid) return { code: 409 };

        const newUserUUID = uuidv4();
        let newUser: UserObject = {
            username: user.username.toLowerCase(),
            password: await encryptObject({ password: user.password }),
            videos: []
        }

        set(ref(db, newUserUUID), newUser)
        .catch((err) => {
            console.error(err);
            return { code: 501 };
        });
        
        setUserStorage({ username: newUser.username, uuid: newUserUUID });
        setUser({ username: newUser.username, uuid: newUserUUID });

        return { code: 200 };
    }

    const signOutUser = () => {
        delUserStorage();
        setUser(null);
    }

    const changeUserPassword = async (oldPassword: string, newPassword: string) => {
        try {
            const userData = await findUser(user?.username!);
    
            if (!userData) return { code: 401 };
    
            try {
                const storedPassword = await decryptObject(userData.data?.password!);

                if (storedPassword.password !== oldPassword || storedPassword.password === newPassword) return { code: 401 };
    
                try {
                    await update(ref(db, userData.uuid!), {
                        password: await encryptObject({ password: newPassword })
                    });
    
                    return { code: 200 };
                } catch (err) {
                    return { code: 401 };
                }
            } catch (err) {
                return { code: 401 };
            }
        } catch (err) {
            return { code: 401 };
        }
    };    

    return {
        user,
        loginModalState,
        setLoginModalState,
        signInModalState,
        setSignInModalState,
        changePwdModalState,
        setChangePwdModalState,
        loginUser,
        signInUser,
        signOutUser,
        changeUserPassword
    }
}