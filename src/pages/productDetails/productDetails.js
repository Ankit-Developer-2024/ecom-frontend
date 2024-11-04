import Footer from "../../features/common/Footer";
import NavBar from "../../features/navbar/navbar";
import ProductDetails from "../../features/product/components/productDetails";

export default function ProductDetailsPage(){
    return(
             <>
             <NavBar>
             <ProductDetails></ProductDetails>
             </NavBar>
             <Footer></Footer>
             </>
     );
}