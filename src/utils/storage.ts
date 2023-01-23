import { StorageKeys } from "./static";

export const setItemToStorage = (key: StorageKeys, value: string) => {
    localStorage.setItem(key, value);
}
export const getItemFormStorage = (key: StorageKeys) => {
    const storageValue = localStorage.getItem(key);

    if (storageValue) {
        return JSON.parse(storageValue)
    }
    return null
}
export const clearItemFormStorage = (key: StorageKeys) => {
    localStorage.removeItem(key)
}