import { useEffect, useState } from "react";
import { removeCookie, setCookie } from "typescript-cookie";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Change initial state

  const getUserSession = async () => {
    const res = await fetch(
      import.meta.env.VITE_API_KEY + "/api/auth/user/get-user-session",
      { credentials: "include" }
    );
    const { cookie } = await res.json();
    setIsAuthenticated(!!cookie); // Convert token existence to boolean
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
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
