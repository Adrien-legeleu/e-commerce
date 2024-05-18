import { Button, Divider, Stack, Typography, colors, styled } from "@mui/material";
import { LoginForm , RegisterForm } from "../../components/Auth";

import { useState } from "react";
import { ISignInFormValues, useUserContext } from "../../contexts/userContext";
import { toast } from "react-toastify";

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { onLogin  } = useUserContext()
  const { onRegister } = useUserContext()

  const onChangeAuthType = () => {
    setIsLogin(!isLogin);
  };
  const onSubmit= async (event: React.FormEvent<HTMLFormElement> )=>{
    try {
        event.preventDefault()

        const data = new FormData(event.currentTarget)
        const values={
          email : data.get("email"),
          password : data.get("password"),
          username: data.get("username")
        }
        if (isLogin) {
          onLogin(values as ISignInFormValues)
        }else{
          onRegister(values as ISignInFormValues)
        }

    } catch (error:any) {
        console.log(error?.response?.data?.error || '');
            toast.error(error?.response?.data?.error || '')
    }
  }

  return (
    <AuthWrapper>
      <AuthForm onSubmit={onSubmit}>
        <Stack>
          <Typography variant="h2" textAlign="center">
            {isLogin ? "LOGIN" : "REGISTER"}
          </Typography>
          <Divider sx={{width: '100%'}}/>
        </Stack>
        {isLogin ? <LoginForm /> : <RegisterForm/>}
        <Button variant="contained" type="submit">{isLogin ? "Login" : "Register"}</Button>
        <FooterText variant="body1">
          {isLogin ? "Don't have an account ? " : "Have an account ? "}
          <ChangeAuthFormText variant="body1" onClick={onChangeAuthType}>
            {isLogin ? "Register here" : "Login here"}
          </ChangeAuthFormText>
        </FooterText>
      </AuthForm>
    </AuthWrapper>
  );
};

const AuthWrapper = styled(Stack)(({ theme }) => ({
  padding: "0 30%",
  justifyContent: "center",
  minHeight: "100vh",
  [theme.breakpoints.down("md")]: {
    padding: "0 20%",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0 10%",
  },
}));
const AuthForm = styled("form")(() => ({
      padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: 20,
    boxSizing: 'border-box',
    maxWidth: 450,
    backgroundColor: '#fff',
    borderRadius: 8,
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
}));
const ChangeAuthFormText = styled(Typography)(() => ({
 color: '#007bff',
    cursor: 'pointer',
    transition: 'color 0.5s ease-in-out',
    '&:hover': {
        color: '#0069d9'
    }
}));
const FooterText = styled(Typography)(() => ({
  color: "blue",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  columnGap: 10,
}));