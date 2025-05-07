export interface StorageService {
    getToken: () => string | null;
    setToken: (token: string) => void;
    clearToken: () => void;
    
    getUser: <T>() => T | null;
    setUser: <T>(user: T) => void;
    clearUser: () => void;
    
    clear: () => void;
}