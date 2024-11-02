import React from "react";
import './Admin.css';
import Sidebar from "../../components/sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../../components/AddProduct/AddProduct";
import ListProduct from "../../components/ListProduct/ListProduct";
import EditProduct from "../../components/EditProduct/EditProduct";

const Admin = () => {
  return (
    <div>
        <div className="admin">
          <Sidebar />
          <Routes>
            <Route path="/addproduct" element={<AddProduct />}/>
            <Route path="/listproduct" element={<ListProduct />}/>
            <Route path="/editproduct/:product_id" element={<EditProduct />} />
          </Routes>
        </div>
    </div>
  )
}

export default Admin;