import AdminOrders from "../../features/admin/components/AdminOrders";
import NavBar from "../../features/navbar/navbar";

export default function AdminOrdersPage() {
    return (
     <div>
        <NavBar>
          <AdminOrders></AdminOrders>
        </NavBar>
     </div>
    );
}