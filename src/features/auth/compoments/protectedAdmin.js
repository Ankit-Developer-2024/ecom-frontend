import { useSelector } from "react-redux"
import { selectLoggedInUser } from "../AuthSlice"
import { Navigate } from "react-router-dom"
import { selectUserInfo } from "../../user/userSlice";

export function ProtectedAdmin({children}) {
    const user=useSelector(selectLoggedInUser);
    const userInfo=useSelector(selectUserInfo);

    if(!user){
        return <Navigate to='/login' replace={true}></Navigate>
    }
    if(userInfo && userInfo.role!=="admin"){
        return <Navigate to='/' replace={true}></Navigate>
    }
    else{
        return children
    }
}