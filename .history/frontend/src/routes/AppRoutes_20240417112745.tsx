import {  Route, Routes } from "react-router-dom"
import { useUserContext } from "../contexts/userContext"
import { Home } from "../pages/Home"
import { AuthPage } from "../pages/Auth"

export const AppRoutes=()=>{
    const {isAuthenticated} = useUserContext()
    
    return isAuthenticated ? (
        <div>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </div>
    ) : (
        <Routes>
                <Route path="*" element={<AuthPage/>}/>
            </Routes>
    )
}