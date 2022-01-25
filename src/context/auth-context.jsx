import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { token: savedToken } = JSON.parse(localStorage?.getItem("login")) || {
    token: null,
  };
  const [token, setToken] = useState(savedToken);

  return (
    <AuthContext.Provider
      value={{
        setToken,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};