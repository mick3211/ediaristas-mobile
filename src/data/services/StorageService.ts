const BaseStorage = {
    get<T>(storage: Storage, key: string, defaultValue: T): T | string {
        const value = storage.getItem(key);
        if (value === null) return defaultValue;
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    },

    set<T>(storage: Storage, key: string, value: T) {
        if (typeof value !== 'string')
            storage.setItem(key, JSON.stringify(value));
        else storage.setItem(key, value);
    },

    clear(storage: Storage, key: string) {
        storage.removeItem(key);
    },

    clearAll(storage: Storage) {
        storage.clear();
    },
};

export const LocalStorage = {
    get<T>(key: string, defaultValue: T): T | string {
        return BaseStorage.get(localStorage, key, defaultValue);
    },

    set<T>(key: string, value: T) {
        return BaseStorage.set(localStorage, key, value);
    },

    clear(key: string) {
        return BaseStorage.clear(localStorage, key);
    },

    clearAll() {
        return BaseStorage.clearAll(localStorage);
    },
};

export const SessionStorage = {
    get<T>(key: string, defaultValue: T): T | string {
        return BaseStorage.get(sessionStorage, key, defaultValue);
    },

    set<T>(key: string, value: T) {
        return BaseStorage.set(sessionStorage, key, value);
    },

    clear(key: string) {
        return BaseStorage.clear(sessionStorage, key);
    },

    clearAll() {
        return BaseStorage.clearAll(sessionStorage);
    },
};
