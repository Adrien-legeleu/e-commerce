import {
  createContext,
  ReactNode,
  useCallback,
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
  onLogout: async () => {},
});

export const AdminContextProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setadmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onLogout = useCallback(() => {
    localStorage.removeItem("authtoken");
    setUser(null);
    setIsAuthenticated(false);
    toast.success("You are now logged out !");
  }, []);

  const onLogin = async (values: ISignInFormValues) => {
    try {
      const response = await api.post("/auth/login", values);
      console.log("login response", response);
      localStorage.setItem("authToken", response?.data?.authToken);
      setIsAuthenticated(true);
      toast.success("You are logged in!");
    } catch (error: any) {
      console.error("Login error", error);
      toast.error(error?.response?.data?.error || "");
    }
  };

  const onRegister = async (values: ISignUpFormValues) => {
    try {
      const response = await api.post("/auth/register", values);
      console.log("register response", response);
      localStorage.setItem("authToken", response?.data?.authToken);
      setIsAuthenticated(true);
      toast.success("Your account has been created!");
    } catch (error: any) {
      console.error("Register error", error);
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
      onLogout();
      toast.error(error?.response?.data?.error || "");
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setIsAuthenticated(false);
    } else {
      checkToken();
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AdminContext.Provider
      value={{ admin, isAuthenticated, onRegister, onLogin, onLogout }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  return useContext(AdminContext);
};
