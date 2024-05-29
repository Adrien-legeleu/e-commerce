import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../../../frontend/src/config/api";
import { toast } from "react-toastify";

export interface ISignInFormValues {
  email: string;
  password: string;
}

export const UserContext = createContext({
  user: null,
  isAuthenticated: false,
  onRegister: async (values: ISignInFormValues) => {},
  onLogin: async (values: ISignInFormValues) => {},
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onLogin = async (values: ISignInFormValues) => {
    try {
      const response = await api.post("/auth/login-admin", values);
      console.log("login");
      localStorage.setItem("authToken", response?.data?.authToken);
      setIsAuthenticated(true);
      toast.success("Your are logged in !");
    } catch (error) {
      toast.error(error?.response?.data?.error || "");
    }
  };
  const onRegister = async (values: ISignInFormValues) => {
    try {
      const response = await api.post("/auth/register-admin", values);
      console.log("register");
      localStorage.setItem("authToken", response?.data?.authToken);
      setIsAuthenticated(true);
      toast.success("Your account has been created !");
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "");
    }
  };

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated, onRegister, onLogin }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
