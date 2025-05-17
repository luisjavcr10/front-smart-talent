import { createContext, useState, useEffect, ReactNode } from "react";
import { storage } from "@/shared/utils/storage";
import { AuthService } from "../services/authService";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface LoginProps {
  email: string;
  password: string;
}

interface UserContextType {
  user: User | null;
  login: (credentials: LoginProps) => Promise<void>;
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

  const login = async ({ email, password }: LoginProps) => {
    const { token, user } = await AuthService.login(email, password);

    storage.setToken(token);
    storage.setUser(user);
    setUser(user);
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
