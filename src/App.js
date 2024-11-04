import React, { useEffect } from 'react';

import './App.css';
import HomePage from './pages/home/HomePage';
import SiginUpPage from './pages/siginUpPage/SignUp';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/loginPage/Login';
import CartPage from './pages/cartPage/cartPage';
import CheckoutPage from './pages/checkoutPage/checkoutPage';
import ProductDetailsPage from './pages/productDetails/productDetails';
import { Protected } from './features/auth/compoments/protected';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from './features/auth/AuthSlice';
import { fetchItemByUserIdAsync } from './features/cart/CartSlice';
import { PageNotFound } from './pages/pageNotFound/404Page';
import { OrderSuccessPage } from './pages/orderSuccessPage/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrderPage/UserOrderPage';
import UserProfilePage from './pages/userProfilePage/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import LogOut from './features/auth/compoments/Logout';
import ForgotPasswordPage from './pages/forgotPasswordPage/ForgotPasswordPage';
import AdminHomePage from './pages/adminHome/AdminHomePage';
import AdminProductDetailsPage from './pages/adminProductDetailsPage/adminProductDetailsPage';
import AdminPeoductFormPage from './pages/adminProductFormPage/AdminPeoductFormPage';
import AdminOrdersPage from './pages/adminOrderPage/AdminOrderPage';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { ProtectedAdmin } from './features/auth/compoments/protectedAdmin';
import StripeCheckoutPage from './pages/stripeCheckoutPage/StripeCheckoutPage';
import ResetPasswordPage from './pages/resetPasswordPage/ResetPasswordPage';

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><HomePage></HomePage></Protected>,
  },
  {
    path: "/admin",
    element: <Protected><AdminHomePage></AdminHomePage></Protected>,
  },
  {
    path: "/signup",
    element: <SiginUpPage></SiginUpPage>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/cart",
    element: <Protected><CartPage></CartPage></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><CheckoutPage></CheckoutPage></Protected>,
  }, 
  {
    path: "/order-success/:id",
    element: <Protected><OrderSuccessPage></OrderSuccessPage></Protected>,
  }, 
  {
    path: "/product-detail/:id",
    element: <Protected><ProductDetailsPage></ProductDetailsPage></Protected>,
  }, 
  {
    path: "/admin/product-detail/:id",
    element: <ProtectedAdmin><AdminProductDetailsPage></AdminProductDetailsPage></ProtectedAdmin>,
  },
  {
    path: "/admin/product-form",
    element: <ProtectedAdmin><AdminPeoductFormPage></AdminPeoductFormPage></ProtectedAdmin>,
  },  
  {
    path: "/admin/product-form/edit/:id",
    element: <ProtectedAdmin><AdminPeoductFormPage></AdminPeoductFormPage></ProtectedAdmin>,
  },  
  {
    path: "/admin/orders",
    element: <ProtectedAdmin><AdminOrdersPage></AdminOrdersPage></ProtectedAdmin>,
  },  
  {
    path: "/orders",
    element: <Protected><UserOrdersPage></UserOrdersPage></Protected>,
  }, 
  {
    path: "/profile",
    element: <Protected><UserProfilePage></UserProfilePage></Protected>,
  }, 
  {
    path: "/logout",
    element: <Protected><LogOut></LogOut></Protected>,
  }, 
  {
    path: "/stripe-checkout/",
    element: <Protected><StripeCheckoutPage></StripeCheckoutPage></Protected>,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage></ResetPasswordPage>,
  },
  {
    path:"*",
    element:<PageNotFound></PageNotFound>
  }
]);

function App() {
  const user=useSelector(selectLoggedInUser);
  const userChecked=useSelector(selectUserChecked);
  const dispatch=useDispatch()
  

  useEffect(()=>{

    dispatch(checkAuthAsync())
  },[dispatch])


  useEffect(()=>{
    
  if(user){
    dispatch(fetchItemByUserIdAsync())
    //we can get req.user by token on backend so no need to give in front-end
    dispatch(fetchLoggedInUserAsync())
  
  }
  },[dispatch,user])


  return (
   <>
   <div>
  {userChecked && <Provider template={AlertTemplate} {...options} >
      <RouterProvider router={router} />
    </Provider>}
   </div>
   </>
  );
}

export default App;
