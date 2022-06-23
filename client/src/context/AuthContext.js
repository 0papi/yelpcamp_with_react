import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const baseUrl = "http://localhost:5000/campgrounds";

  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem("user"));
    if (getUser && getUser.token) {
      setUser(true);
      setToken(getUser.token);
      navigate("/campgrounds");
    } else {
      navigate("/campgrounds/login");
      setUser(false);
      setToken(null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <AuthContext.Provider
      value={{ user, token, userData, setUserData, baseUrl }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
