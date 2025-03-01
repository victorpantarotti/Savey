import { UserData } from "@/contexts/LoginContext";
import { decryptObject, encryptObject } from "./encryption";

export const getUserStorage = async (): Promise<UserData | null> => {
    const encryptedData = localStorage.getItem("user__data");

    if (!encryptedData) {
        return null;
    }

    try {
        return await decryptObject(JSON.parse(encryptedData));
    } catch (err) {
        return null;
    }
};

export const setUserStorage = async (user: UserData) => {
    const encryptedData = await encryptObject(user);
    localStorage.setItem("user__data", JSON.stringify(encryptedData));
};

export const delUserStorage = () => localStorage.removeItem("user__data");