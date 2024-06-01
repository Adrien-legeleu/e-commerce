import { Route, Routes } from "react-router-dom";
import { Child, Home, Men, Women } from "../Pages";

export const RouterApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/women" element={<Women />} />
      <Route path="/men" element={<Men />} />
      <Route path="/child" element={<Child />} />
    </Routes>
  );
};
