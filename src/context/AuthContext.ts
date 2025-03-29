import { UserFromDB } from "@/lib/interfaces";
import { createContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token:string) => void;
  logout: () => void;
  user:UserFromDB|null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
