import {ReactNode} from "react"

export const UserContext = createContext({
    user: null,
    isAuthenticated : false,

})

export const UserContextProvider =({children} : {children : React.ReactNode})