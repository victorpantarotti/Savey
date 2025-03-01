import sodium from 'libsodium-wrappers';

export interface IEncryptedData {
    ciphertext: string
    nonce: string
    key: string
}

export async function generateKey() {
  await sodium.ready;
  return sodium.randombytes_buf(sodium.crypto_secretbox_KEYBYTES);
}

export async function encryptObject(obj: object) {
  await sodium.ready;

  const message = JSON.stringify(obj);
  const key = await generateKey();
  const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
  const ciphertext = sodium.crypto_secretbox_easy(message, nonce, key);

  return {
    ciphertext: sodium.to_base64(ciphertext),
    nonce: sodium.to_base64(nonce),
    key: sodium.to_base64(key)
  };
}

export async function decryptObject(encryptedData: IEncryptedData) {
  await sodium.ready;

  const { ciphertext, nonce, key } = encryptedData;

  const decrypted = sodium.crypto_secretbox_open_easy(
    sodium.from_base64(ciphertext),
    sodium.from_base64(nonce),
    sodium.from_base64(key)
  );

  return JSON.parse(sodium.to_string(decrypted));
}