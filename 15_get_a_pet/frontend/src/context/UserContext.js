import { createContext } from "react";
import useAuth from "../hooks/useAuth";

const Context = createContext();

const UserProvider = ({ children }) => {
  const { authenticated, RegisterAuth, logout, login } = useAuth();

  return (
    <Context.Provider value={{ authenticated, RegisterAuth, logout, login }}>
      {children}
    </Context.Provider>
  );
};

export { Context, UserProvider };
