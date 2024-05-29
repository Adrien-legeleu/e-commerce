import { useState } from "react";
import { Login, Register } from "../components/auth";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const changeAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      {isLogin ? <Login /> : <Register />}
      <button onClick={changeAuthMode}>
        {" "}
        {isLogin
          ? "Pas encore de compte ? créer en un maintenant ?"
          : "Connectez-vous !"}
      </button>
    </div>
  );
};
