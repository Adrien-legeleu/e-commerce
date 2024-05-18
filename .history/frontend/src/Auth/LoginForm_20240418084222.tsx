import { FormControl, TextField } from "@mui/material"


export const LoginForm = ()=>{
    return (
        <FormControl defaultValue="" required fullWidth>
            <TextField type="email" margin="normal" required fullWidth id=" email" aria-label="email" name="email" autoComplete="email" autoFocus placeholder="email"/>
            <TextField margin="normal" required fullWidth id=" password" aria-label="password" name="password"  type="password" autoComplete="password" autoFocus placeholder="password"/>
        </FormControl>
)}