import { createContext, useContext } from "react";
import type { UserReadDto } from "@/shared/types/user";

interface AuthContextType {
  user: UserReadDto | null;
  loading: boolean;
  // login muss in den Context, damit die LoginPage darauf zugreifen kann
  login: (userData: UserReadDto, token: string) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};