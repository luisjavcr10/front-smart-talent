import { createContext, useState, useEffect, ReactNode } from "react";
import { storage } from "@/shared/utils/storage";
import { AuthService } from "../services/authService";

interface User {
  id: number;
  name: string;
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
    //const response = await AuthService.login(email, password);
    console.log(email);
    console.log(password);
    const response = {
      message: "Credenciales validas",
      token: "odfnsdognjdfsjbv9u",
      user: {
        id: 1,
        name: "Luis Castillo Rabanal",
        email: "ing.castillorabanal@gmail.com",
        role: ["ADMIN"]
      }
    }
    if (response.message === "Credenciales inválidas") {
      return false;
    }else{
      storage.setToken(response.token);
      storage.setUser(response.user);
      setUser(response.user);
      return true;
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
