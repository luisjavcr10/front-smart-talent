import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser debe usarse dentro de UserProvider");
  return context;
};

export const useHasRole = (rolesToCheck: string | string[]) => {
  const { user } = useUser();
  if (!user) return false;
  const userRoles = user.roles || [];
  if (Array.isArray(rolesToCheck)) {
    return rolesToCheck.some(role => userRoles.includes(role));
  }
  return userRoles.includes(rolesToCheck);
};
