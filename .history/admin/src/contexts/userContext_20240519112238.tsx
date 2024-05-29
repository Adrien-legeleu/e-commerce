import { createContext, ReactNode, useContext, useState } from "react";

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

  const onRegister = () => {};

  return (
    <UserContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
