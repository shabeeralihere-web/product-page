import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(
    localStorage.getItem("role")
  );

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  const [user, setUser] = useState({
    firstName: localStorage.getItem("firstName"),
    lastName: localStorage.getItem("lastName"),
    email: localStorage.getItem("email"),
  });

  const login = (loginData) => {
    localStorage.setItem("accessToken", loginData.accessToken);
    localStorage.setItem("role", loginData.role);
    localStorage.setItem("firstName", loginData.firstName);
    localStorage.setItem("lastName", loginData.lastName);
    localStorage.setItem("email", loginData.email);

    setAccessToken(loginData.accessToken);
    setRole(loginData.role);

    setUser({
      firstName: loginData.firstName,
      lastName: loginData.lastName,
      email: loginData.email,
    });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("email");

    setAccessToken(null);
    setRole(null);

    setUser({
      firstName: null,
      lastName: null,
      email: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        accessToken,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};