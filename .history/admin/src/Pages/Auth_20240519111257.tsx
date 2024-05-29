import { useState } from "react";
import { Login } from "../components/auth";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <Login />
    </div>
  );
};
