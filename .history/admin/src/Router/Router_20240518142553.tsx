import { Route, Routes } from "react-router-dom";
import { Auth } from "../Pages";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
    </Routes>
  );
};
