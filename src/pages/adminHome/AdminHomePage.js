import AdminProductList from "../../features/admin/components/AdminProductList";
import NavBar from "../../features/navbar/navbar";

export default function AdminHomePage() {
    return (
     <div>
        <NavBar>
          <AdminProductList></AdminProductList>
        </NavBar>
     </div>
    );
}