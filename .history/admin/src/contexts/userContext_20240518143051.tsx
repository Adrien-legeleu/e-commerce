import ReactNode, { useState } from "react";

export const UserContext = createContext({
  user: null,
  isAuthenticated: false,
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return <div>{children}</div>;
};
