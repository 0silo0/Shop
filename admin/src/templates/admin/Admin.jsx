import React from "react";
import './Admin.css';
import Sidebar from "../../components/sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddProuct from "../../components/AddProduct/AddProuct";
import ListProduct from "../../components/ListProduct/ListProduct";

const Admin = () => {
  return (
    <div>
        <div className="admin">
          <Sidebar />
          <Routes>
            <Route path="/addproduct" element={<AddProuct />}/>
            <Route path="/listproduct" element={<ListProduct />}/>
          </Routes>
        </div>
    </div>
  )
}

export default Admin;