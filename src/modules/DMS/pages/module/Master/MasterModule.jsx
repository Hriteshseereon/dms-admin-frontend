// MasterModule.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import MasterTab from "./MasterTab";

// actual components for each tab


import Product from "./Product";
import Business from "./Business";

import ProductGroupMaster from "./ProductGroupMaster";


const MasterModule = ({ allowedTabs }) => {
  return (
    <Routes>
      {/* parent renders tabs and an Outlet */}
      <Route element={<MasterTab allowedTabs={allowedTabs} />}>
        {/* index -> default tab (organisation) */}
        <Route index element={<Product />} />
        
        <Route path="product" element={<Product />} />
        <Route path="business-partner" element={<Business />} />
        
        <Route path="reason" element={<ProductGroupMaster />} />
        
        {/* add more nested routes if you extend tabs */}
      </Route>
    </Routes>
  );
};

export default MasterModule;
