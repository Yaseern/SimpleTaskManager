export function storeSession(key: string, value: string) {
    window.sessionStorage.setItem(key, value);
}

export function getSession<T>(key: string): T | null {
    const value = window.sessionStorage.getItem(key);
    return value ? JSON.parse(value) as T : null
}

export function clearSession() {
    window.sessionStorage.clear();     
}