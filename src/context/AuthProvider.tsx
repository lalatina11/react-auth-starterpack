import { GetUserSession, UserFromDB } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import { removeCookie, setCookie } from "typescript-cookie";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Change initial state
  const [user, setUser] = useState<UserFromDB | null>(null);
  const getUserSession = async () => {
    const res = await fetch(
      import.meta.env.VITE_API_KEY + "/api/auth/user/get-user-session",
      { credentials: "include" }
    );
    const { token, user } = (await res.json()) as GetUserSession;
    setIsAuthenticated(!!token); // Convert token existence to boolean
    setUser(user);
  };

  useEffect(() => {
    getUserSession();
  }, []);

  const login = (token: string) => {
    setCookie("user_token", token, {
      expires: 1000 * 60 * 60 * 24 * 7,
      path: "/",
    });
    setIsAuthenticated(true);
  };
  const logout = () => {
    removeCookie("user_token");
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return <p>Loading...</p>; // Prevent early redirects
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
