import { useState } from "react";
import { Login, Register } from "../components/auth";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const changeAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {isLogin ? <Login /> : <Register />}
      <button>
        {" "}
        {isLogin
          ? "Pas encore de compte ? créer en un maintenant ?"
          : "Connectez-vous !"}
      </button>
    </div>
  );
};
