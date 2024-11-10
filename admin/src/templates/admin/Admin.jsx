import React from "react";
import './Admin.css';
import Sidebar from "../../components/sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../../components/AddProduct/AddProduct";
import ListProduct from "../../components/ListProduct/ListProduct";
import EditProduct from "../../components/EditProduct/EditProduct";
import EditUser from "../../components/EditUsers/EditUsers";
import ListUser from "../../components/ListUsers/ListUsers";
import ListOrders from "../../components/ListOrders/ListOrders";
import EditOrder from "../../components/EditOrder/EditOrder";

const Admin = () => {
  return (
    <div>
        <div className="admin">
          <Sidebar />
          <Routes>
            <Route path="/addproduct" element={<AddProduct />}/>
            <Route path="/listproduct" element={<ListProduct />}/>
            <Route path="/editproduct/:product_id" element={<EditProduct />} />
            <Route path="/users" element={<ListUser />}/>
            <Route path="/update/:user_id" element={<EditUser />} />
            <Route path="/orders" element={<ListOrders />}/>
            <Route path="/updateOrder/:order_id" element={<EditOrder />} />
          </Routes>
        </div>
    </div>
  )
}

export default Admin;