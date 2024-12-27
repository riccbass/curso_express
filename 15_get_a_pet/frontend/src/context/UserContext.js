import { createContext } from "react";
import useAuth from "../hooks/useAuth";

const Context = createContext();

const UserProvider = ({ children }) => {
  const { RegisterAuth } = useAuth();

  return (
    <Context.Provider value={{ RegisterAuth }}>{children}</Context.Provider>
  );
};

export { Context, UserProvider };
