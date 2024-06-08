import {
  ISignInFormValues,
  ISignUpFormValues,
  useAdminContext,
} from "../contexts/userContext";
import { useState } from "react";
import { Login, Register } from "../components/auth";
import { AuroraBackground } from "../components/design/AuroraBg";
import LetterPullup from "../components/design/LetterPullup";
import BoxReveal from "../components/design/BoxReveal";
import ShimmerButton from "../components/design/ShimmerButton";

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
          <LetterPullup
            words="Bienvenue dans votre e-commerce"
            className="text-5xl font-semibold text-center"
          />
          {isLogin ? <Login /> : <Register />}
          <div className="flex flex-col items-center justify-center gap-6">
            {" "}
            <ShimmerButton
              type="submit"
              className=" hover:scale-110 duration-300 ease-in-out z-10"
            >
              <BoxReveal>
                <button className=" bg-[#000000] text-sm text-white shadow-2xl rounded-full shadow-back  z-10">
                  Connectez-vous
                </button>
              </BoxReveal>
            </ShimmerButton>
            <div
              onClick={changeAuthMode}
              className="cursor-pointer hover:scale-105 duration-300 ease-in-out z-10 text-sm"
            >
              <BoxReveal>
                {isLogin ? (
                  <p>Pas de compte ? Créer votre compte !</p>
                ) : (
                  <p>Vous avez déjà un compte ? connectez-vous !</p>
                )}
              </BoxReveal>
            </div>
          </div>
        </form>
      </div>
    </AuroraBackground>
  );
};
