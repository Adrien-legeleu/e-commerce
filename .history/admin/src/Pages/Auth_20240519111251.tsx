import { useState } from "react";
import { Login } from "../components/auth";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      <Login />
    </div>
  );
};
