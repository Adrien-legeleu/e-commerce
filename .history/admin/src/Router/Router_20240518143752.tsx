import { Route, Routes } from "react-router-dom";
import { Auth, Home } from "../Pages";
import { useUserCOntext } from "../contexts/userContext";

export const Router = () => {
  const { isAuthenticated } = useUserCOntext;

  return isAuthenticated ? (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<Auth />} />
    </Routes>
  );
};
