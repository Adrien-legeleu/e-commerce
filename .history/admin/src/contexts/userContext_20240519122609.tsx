import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../config/api";

export interface ISignUpFormValues {
  email: string;
  password: string;
  username: string;
}

export interface ISignInFormValues {
  email: string;
  password: string;
}

export const adminContext = createContext({
  admin: null,
  isAuthenticated: false,
  onRegister: async (values: ISignUpFormValues) => {},
  onLogin: async (values: ISignInFormValues) => {},
});

export const adminContextProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setadmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onLogin = async (values: ISignInFormValues) => {
    try {
      const response = await api.post("/auth/login-admin", values);
      console.log("login");
      localStorage.setItem("authToken", response?.data?.authToken);
      setIsAuthenticated(true);
      toast.success("Your are logged in !");
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "");
    }
  };
  const onRegister = async (values: ISignUpFormValues) => {
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

  const onUpdateAdmin = (updateadmin: any) => {
    if (!updateadmin) {
      setadmin(null);
      setIsAuthenticated(false);
      return;
    }
    setadmin(updateadmin);
    setIsAuthenticated(true);
  };
  const checkToken = async () => {
    try {
      const response = await api.get("/auth/check-token");
      const admin = response?.data;
      onUpdateadmin(admin);
    } catch (error: any) {
      onLogout();
      toast.error(error?.response?.data?.error || "");
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authtoken");
    if (!authToken) {
      setIsAuthenticated(true);
    } else {
      checkToken();
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <adminContext.Provider
      value={{ admin, isAuthenticated, onRegister, onLogin }}
    >
      {children}
    </adminContext.Provider>
  );
};

export const useAdminContext = () => {
  return useContext(adminContext);
};
