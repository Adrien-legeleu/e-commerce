import { useState } from "react";
import { Login, Register } from "../components/auth";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return <div>{isLogin ? <Login /> : <Register />}</div>;
};
