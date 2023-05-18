import React, { useState, useCallback } from "react";
import axios from "axios";

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

const AuthContext = React.createContext({
  isManager: false,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const retrieveToken = () => {
  const storedToken = localStorage.getItem("token");

  return { token: storedToken};
};
const retrieveManager = () => {
  const storedManger = localStorage.getItem("manager");

  return { manager: storedManger};
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveToken();
  const managerData = retrieveManager();
  let initialToken;
  let initialManager;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  if (managerData) {
    initialManager = managerData.manager;
  }
  const [token, setToken] = useState(initialToken);
  const [isManager, setIsManager] = useState(initialManager);
  setAuthToken(token);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setIsManager(null);
    localStorage.removeItem("token");
    localStorage.removeItem("manager");
  }, []);

  const loginHandler = (token, isManager) => {
    setToken(token);
    localStorage.setItem("token", token);
    setIsManager(isManager);
    localStorage.setItem("manager", isManager);
  };

  const contextValue = {
    isManager: isManager,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
