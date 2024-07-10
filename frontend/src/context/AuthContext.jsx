/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

  useEffect(() => {
    if (authUser) {
      localStorage.setItem("chat-user", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("chat-user");
    }
  }, [authUser]);

  const value = {
    authUser,
    setAuthUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};