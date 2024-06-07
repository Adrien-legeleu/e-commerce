import {
  ISignInFormValues,
  ISignUpFormValues,
  useAdminContext,
} from "../contexts/userContext";
import { useState } from "react";
import { Login, Register } from "../components/auth";
import { AuroraBackground } from "../components/design/auroraBg";

export const Auth = () => {
  const { onLogin, onRegister } = useAdminContext();
  const [isLogin, setIsLogin] = useState(true);

  const changeAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
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
    <AuroraBackground>
      <div className="h-screen w-full flex items-center justify-center font-montserrat">
        <form
          className="w-full h-full items-center justify-center flex flex-col pt-12"
          onSubmit={onSubmit}
        >
          <h1 className="text-5xl  font-semibold text-center ">
            Bienvenue dans
            <br /> votre e-commerce{" "}
          </h1>
          {isLogin ? <Login /> : <Register />}
          <div className="flex flex-col items-center justify-center gap-10">
            <button
              type="submit"
              className="py-4 px-5 bg-[#000000] text-white shadow-2xl rounded-full shadow-back hover:scale-110 duration-300 ease-in-out z-10"
            >
              Connectez-vous
            </button>
            <div
              onClick={changeAuthMode}
              className="cursor-pointer hover:scale-105 duration-300 ease-in-out z-10"
            >
              {isLogin ? (
                <p>Pas de compte ? Créer votre compte !</p>
              ) : (
                <p>Vous avez déjà un compte ? connectez-vous !</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </AuroraBackground>
  );
};
