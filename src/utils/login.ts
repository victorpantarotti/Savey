import { UserData } from "@/contexts/LoginContext";
import { decrypt, encrypt } from "./encryption";

export const getUserStorage = (): UserData | null => {
    const data = localStorage.getItem("user__data");
    return data ? JSON.parse(decrypt(data)) : null;
};

export const setUserStorage = (user: UserData) => localStorage.setItem("user__data", encrypt(JSON.stringify(user)));
export const delUserStorage = () => localStorage.removeItem("user__data");