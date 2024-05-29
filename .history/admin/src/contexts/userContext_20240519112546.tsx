import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../../../frontend/src/config/api";

export interface ISignInFormValues {
  email: string;
  password: string;
}

export const UserContext = createContext({
  user: null,
  isAuthenticated: false,
  onRegister: () => {},
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onRegister = async (values: ISignInFormValues) => {
    try {
      const response = await api.post("/auth/register-admin", values);
      console.log("register");
      localStorage.setItem("authToken", response?.data?.authToken);
      setIsAuthenticated(true);
    } catch (error) {}
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
