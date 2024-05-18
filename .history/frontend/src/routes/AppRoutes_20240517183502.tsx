import { Route, Routes } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";
import { AuthPage } from "../pages/Auth";
import Home from "../pages/Home/Home";

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
      <Route path="*" element={<AuthPage />} />
    </Routes>
  );
};
