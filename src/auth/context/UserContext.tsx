import { createContext, useState, useEffect, ReactNode } from "react";
import { storage } from "@/shared/utils/storage";
import { AuthService } from "../services/authService";

interface User {
  id: number;
  username: string;
  email: string;
  role: string[];
}

interface LoginProps {
  email: string;
  password: string;
}

interface UserContextType {
  user: User | null;
  login: (credentials: LoginProps) => Promise<boolean>;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = storage.getUser<User>();
    const token = storage.getToken();

    if (savedUser && token) {
      setUser(savedUser);
    }
  }, []);

  const login = async ({ email, password }: LoginProps): Promise<boolean> => {
    try {
      const response = await AuthService.login(email, password);
      if (!response) return false; // Si es null, credenciales incorrectas
  
      storage.setToken(response.token);
      storage.setUser(response.user);
      setUser(response.user);
      return true;
    } catch (error) {
      console.error("Error en login:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    storage.clear();
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
