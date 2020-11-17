import React from "react";
import { Link } from "react-router-dom";

import Layout from "../../hoc/Layout";

import { ADMIN_ADD_PRODUCT_URL } from "../../config";

const renderProductManagement = () => {
  return (
    <div>
      <Link to={ADMIN_ADD_PRODUCT_URL}>Add Product</Link>
    </div>
  );
};

const ProductManagement = () => {
  return (
    <Layout title="Product Management">{renderProductManagement()}</Layout>
  );
};

export default ProductManagement;
