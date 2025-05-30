import { useSelector } from "react-redux"
import { selectLoggedInUser } from "../AuthSlice"
import { Navigate } from "react-router-dom"

export function Protected({children}) {
    const user=useSelector(selectLoggedInUser);

    if(!user){
        return <Navigate to='/login' replace={true}></Navigate>
    }
    else{
        return children
    }
}