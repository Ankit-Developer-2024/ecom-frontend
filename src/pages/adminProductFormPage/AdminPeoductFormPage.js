import AdminProductForm from "../../features/admin/components/ProductForm";
import NavBar from "../../features/navbar/navbar";

export default function AdminPeoductFormPage() {
    return (
     <div>
        <NavBar>
          <AdminProductForm></AdminProductForm>
        </NavBar>
     </div>
    );
}