import { useState } from "react";
import { Login, Register } from "../components/auth";
import { useUserContext } from "../contexts/userContext";
import { toast } from "react-toastify";

export const Auth = () => {
  const { onLogin } = useUserContext();
  const { onRegister } = useUserContext();
  const [isLogin, setIsLogin] = useState(true);

  const changeAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const onSubmit = (e: any) => {
    try {
      e.preventDefault();

      const data = new FormData(e.current);
      const values = {
        username: "username",
        password: "password",
        email: "email",
      };

      if (isLogin) {
        onLogin(values);
      } else {
        onRegister(values);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <form
      className="h-screen w-full flex items-center justify-center  gap-20"
      onSubmit={onSubmit}
    >
      {isLogin ? <Login /> : <Register />}
      <div className="flex flex-col items-center justify-center gap-10">
        <p
          onClick={changeAuthMode}
          className="cursor-pointer hover:scale-105 duration-150"
        >
          {" "}
          {isLogin
            ? "Pas de compte ? Créer votre compte !"
            : "vous avez déjà un compte ? connectez-vous !"}
        </p>
        <button
          type="submit"
          className="py-4 px-5 bg-[#00000012] shadow-2xl rounded-full shadow-back hover:scale-110 duration-200"
        >
          Connectez-vous
        </button>
      </div>
    </form>
  );
};
