import { Route, Routes } from "react-router-dom"
import { Auth, Home } from "../Pages"

export const Router ()=> {
    return(
        <Routes>
            <Route path="/auth" element={<Auth/>}/>
    
        </Routes>
    )
}