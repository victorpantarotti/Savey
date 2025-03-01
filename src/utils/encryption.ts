const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_SECRET;

async function getKey(): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyHash = await crypto.subtle.digest("SHA-256", encoder.encode(SECRET_KEY)); // Hash to 256 bits
  
  return crypto.subtle.importKey(
    "raw",
    keyHash,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
}

const IV_LENGTH = 12;

export async function encrypt(text: string): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const key = await getKey();
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(text)
  );

  return btoa(
    String.fromCharCode(...iv) + String.fromCharCode(...new Uint8Array(encrypted))
  );
}

export async function decrypt(encryptedText: string): Promise<string> {
  try {
    const binaryData = atob(encryptedText);
    const iv = new Uint8Array(binaryData.slice(0, IV_LENGTH).split("").map(c => c.charCodeAt(0)));
    const encryptedData = new Uint8Array(binaryData.slice(IV_LENGTH).split("").map(c => c.charCodeAt(0)));

    const key = await getKey();
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      encryptedData
    );

    return new TextDecoder().decode(decrypted);
  } catch (error) {
    // console.error("Decryption failed:", error);
    return "";
  }
}