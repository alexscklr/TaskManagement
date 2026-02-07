import { type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { useAuth } from "../hooks/useAuth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading, login, logout, isAuthenticated } = useAuth();

  return (
    <AuthContext.Provider value={{ 
        user, 
        loading, 
        login, 
        logout, 
        isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
};