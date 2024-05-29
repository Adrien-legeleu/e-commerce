import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
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

export const AdminContext = createContext({
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

  const onUpdateAdmin = (updateAdmin: any) => {
    if (!updateAdmin) {
      setadmin(null);
      setIsAuthenticated(false);
      return;
    }
    setadmin(updateAdmin);
    setIsAuthenticated(true);
  };
  const checkToken = async () => {
    try {
      const response = await api.get("/auth/check-token");
      const admin = response?.data;
      onUpdateAdmin(admin);
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "");
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authtoken");
    if (!authToken) {
      setIsAuthenticated(false);
    } else {
      checkToken();
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AdminContext.Provider
      value={{ admin, isAuthenticated, onRegister, onLogin }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  return useContext(AdminContext);
};
