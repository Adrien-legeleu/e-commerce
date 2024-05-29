import { useState } from "react";
import { Login, Register } from "../components/auth";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const changeAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center flex-col gap-10">
      {isLogin ? <Login /> : <Register />}
      <button
        onClick={changeAuthMode}
        className="py-4 px-5 bg-[#00000008] shadow-2xl rounded-full shadow-back hover:scale-110 duration-200"
      >
        {" "}
        {isLogin ? "Créer votre compte !" : "Connectez-vous !"}
      </button>
    </div>
  );
};
