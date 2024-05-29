import {
  ISignInFormValues,
  ISignUpFormValues,
  useAdminContext,
} from "../contexts/userContext";
import { useState } from "react";
import { Login, Register } from "../components/auth";

export const Auth = () => {
  const { onLogin, onRegister } = useAdminContext();
  const [isLogin, setIsLogin] = useState(true);

  const changeAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(event.currentTarget);
    const values = {
      email: data.get("email"),
      password: data.get("password"),
      username: data.get("username"),
    };
    console.log(values);

    if (isLogin) {
      await onLogin(values as ISignInFormValues);
    } else {
      await onRegister(values as ISignUpFormValues);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <form
        className="w-full h-full items-center justify-center flex  gap-20"
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
    </div>
  );
};
