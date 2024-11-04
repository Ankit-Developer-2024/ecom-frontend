import NavBar from "../../features/navbar/navbar";
import UserProfile from "../../features/user/components/UserProfile";

export default function UserProfilePage(){
    return(
             <>
             <NavBar>
                <h1 className="mx-auto text-2xl">My Profile</h1>
            <UserProfile></UserProfile>
             </NavBar>
           
             </>
     );
}