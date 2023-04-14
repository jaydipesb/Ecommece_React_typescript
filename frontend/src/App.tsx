import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Login from "./Auth/Login";
import Nav from "./Component/Nav";
import Signup from "./Auth/Signup";
import PrivateComponent from "./Auth/PrivateComponent";
import ProductListing from "./Component/Product/ProductListing";
import ProductDetails from "./Component/Product/ProductDetails";
import CartDetails from "./Component/Product/CartDetails";
import CheckoutCart from "./Component/Product/CheckoutCart";
import PurchaseProduct from "./Component/Product/PurchaseProduct";
import Dashboard from "./admin/Pages/Dashboard";

import { Space } from "antd";
import AdminFooter from "./admin/AdminLayout/AdminFooter";
import AdminHeader from "./admin/AdminLayout/AdminHeader";
// import AdminContent from "../src/admin/AdminLayout/AdminContent";
import AdminSidebar from "./admin/AdminLayout/AdminSidebar";
import Users from "./admin/Pages/Users";
import Products from "./admin/Pages/Products";
import { useEffect,useState } from "react";
import AdminMain from "./admin/AdminLayout/AdminMain";

function App() {
  const [item, setItem] = useState();
  
  let itemData = localStorage.getItem("user");

  useEffect(() => {
     if (itemData) {
    let data = JSON.parse(itemData);
    console.log("user item", data[0].name);
    setItem(data[0].name);
  }
 
  }, [])

  console.log(item);

  return (
    //user routes
    <div className="App">
      <Router>
        <ToastContainer position="top-center" />
        <Routes>
          <Route element={<PrivateComponent />}></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="/product" element={<ProductListing />} />
          <Route path="/details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartDetails />} />
          <Route path="/checkout" element={<CheckoutCart />} />
          <Route path="/purchase" element={<PurchaseProduct />} />
          {/* <Route exact path="/" element={<Home />} /> */}

          <Route path='/' element={<AdminMain />} >
          <Route path='/admin/users' element={<Users />} />
          <Route path='/admin/product' element={<Products />} />
        </Route>  
        </Routes>
      </Router>
    </div>

    // Admin ROutes
    // <div className="App">
    //   <AdminHeader />
    //   <div className="SideMenuAndPageContent">
    //     <Router>
    //     <AdminSidebar></AdminSidebar>
    //       <ToastContainer position="top-center" />
    //       <Routes>
    //         <Route element={<PrivateComponent />}></Route>
    //         <Route path="/" element={<Users />} />
    //         <Route path="/admin/users" element={<Users />} />
    //         <Route path="/admin/product" element={<Products />} />
    //       </Routes>
    //     </Router>
    //   </div>
    //   <AdminFooter />
    // </div>
  );
}

export default App;
