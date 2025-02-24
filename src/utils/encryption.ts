import CryptoJS from "crypto-js";

const { VITE_ENCRYPTION_SECRET } = import.meta.env;

export const encrypt = (data: string) => CryptoJS.AES.encrypt(data, VITE_ENCRYPTION_SECRET).toString();
export const decrypt = (data: string) => CryptoJS.AES.decrypt(data, VITE_ENCRYPTION_SECRET).toString(CryptoJS.enc.Utf8);