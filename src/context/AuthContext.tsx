"use client";
import React, {
  createContext,
  ReactNode,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

interface AuthContextProps {
  setActiveMenu: Dispatch<SetStateAction<boolean>>;
  activeMenu: boolean;
  login: (email: string, password: string) => Promise<void>;
  error: null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const UserStorage = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeMenu, setActiveMenu] = useState<boolean>(true);

  async function login(email: string, password: string) {
    try {
      setError(null);
      setLoading(true);
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      router.push("https://samuelforte.github.io/EstagieIFCE/");
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        setActiveMenu,
        activeMenu,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
