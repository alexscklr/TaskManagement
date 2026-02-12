import { useState, useEffect, useCallback } from "react";
import { type UserReadDto } from "@/shared/types/user"; // Dein Interface aus der letzten Nachricht
import { logout as apiLogout } from "../lib/auth"; // Deine Axios Logout-Funktion

export const useAuth = () => {
  const [user, setUser] = useState<UserReadDto | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Initialisierung: Prüfen, ob beim Seitenladen bereits ein User da ist
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse user from storage", error);
        // Bei Fehlern im Storage lieber aufräumen
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  // 2. Login-Hilfsfunktion (wird von deiner Login-Seite gerufen)
  const login = useCallback((userData: UserReadDto, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  }, []);

  // 3. Logout-Funktion
  const logout = useCallback(async () => {
    try {
      await apiLogout(); // Löscht Daten im Storage
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      // State in der App zurücksetzen
      setUser(null);
    }
  }, []);

  // Beispiel für Berechtigungen (falls du Rollen im UserReadDto hast)
  // const isAdmin = user?.role === "Admin";

  return { 
    user, 
    isAuthenticated: !!user, 
    loading, 
    login, 
    logout 
  };
};


