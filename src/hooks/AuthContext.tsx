import React, { useState, useContext, useCallback } from "react";

import { createContext } from "react";
import api from "../services/api";
interface AuthState {
  token: string;
  user: object;
}
interface SignInCredentilas {
  email: string;
  password: string;
}
interface AuthContextDate {
  user: object;
  signIn(credentials: SignInCredentilas): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextDate>({} as AuthContextDate);
const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@cube:token");
    const user = localStorage.getItem("@cube:user");
    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post("auth", {
      email,
      password,
    });
    const { token, user } = response.data;
    localStorage.setItem("@cube:token", token);
    localStorage.setItem("@cube:user", JSON.stringify(user));
    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@cube:token");
    localStorage.removeItem("@cube:user");
    setData({} as AuthState);
  }, []);
  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
function useAuth(): AuthContextDate {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthPorvider");
  }
  return context;
}
export { AuthProvider, useAuth };
