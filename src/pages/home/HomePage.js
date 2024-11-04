import Footer from "../../features/common/Footer";
import NavBar from "../../features/navbar/navbar";
import ProductList from "../../features/product/components/productList";

export default function HomePage() {
    return (
     <div>
        <NavBar>
           <ProductList></ProductList>
        </NavBar>
        <Footer></Footer>
     </div>
    );
}