import { Route, Routes } from "react-router-dom";
import { Auth, Home } from "../Pages";
import { useAdminContext } from "../contexts/userContext";

export const Router = () => {
  const { isAuthenticated } = useAdminContext();

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
