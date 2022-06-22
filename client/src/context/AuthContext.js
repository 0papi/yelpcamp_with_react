import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  //   const navigate = useNavigate();

  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem("user"));
    if (getUser && getUser.token) {
      setUser(true);
      setToken(getUser.token);
      setUserData(getUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
