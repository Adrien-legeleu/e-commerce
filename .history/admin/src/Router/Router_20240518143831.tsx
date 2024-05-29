import { Route, Routes } from "react-router-dom";
import { Auth, Home } from "../Pages";
import { useUserCOntext } from "../contexts/userContext";

export const AppRoutes = () => {
  const { isAuthenticated } = useUserContext();

  return isAuthenticated ? (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  ) : (
    <Routes>
      <Route path="*" element={<Auth />} />
    </Routes>
  );
};