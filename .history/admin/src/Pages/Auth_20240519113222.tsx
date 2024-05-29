import { useState } from "react";
import { Login, Register } from "../components/auth";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const changeAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center  gap-10">
      {isLogin ? <Login /> : <Register />}
      <div className="flex flex-col items-center justify-center gap-10">
        <button className="py-4 px-5 bg-[#00000012] shadow-2xl rounded-full shadow-back hover:scale-110 duration-200">
          Connectez-vous
        </button>
        <p onClick={changeAuthMode} className="">
          {" "}
          {isLogin
            ? "Pas de compte ? Créer votre compte !"
            : "vous avez déjà un compte ? connectez-vous !"}
        </p>
      </div>
    </div>
  );
};
