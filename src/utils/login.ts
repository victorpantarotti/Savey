import { UserData } from "@/contexts/LoginContext";
import { decrypt, encrypt } from "./encryption";

export const updateUserStorage = async (): Promise<any | null> => {
    const data = localStorage.getItem("user__data");

    if (data) {
        try {
            const decryptedData = await decrypt(data);
            if (decryptedData) {
                return JSON.parse(decryptedData);
            } else {
                console.error("[updateUserStorage]: Decryption failed, empty result.");
                return null;
            }
        } catch (error) {
            console.error("[updateUserStorage]: Error decrypting data:", error);
            return null;
        }
    } else {
        console.error("[updateUserStorage]: No data found in localStorage.");
        return null;
    }
};

export const setUserStorage = async (user: UserData) => {
    encrypt(JSON.stringify(user)).then((encryptedData) => {
        localStorage.setItem("user__data", encryptedData);
    });
};
export const delUserStorage = () => localStorage.removeItem("user__data");