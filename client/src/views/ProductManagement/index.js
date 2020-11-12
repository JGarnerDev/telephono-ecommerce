import React from "react";
import { Link } from "react-router-dom";

import Layout from "../../hoc/Layout";

import {
  ADMIN_ADD_PRODUCT_URL,
  ADMIN_DELETE_PRODUCT_URL,
  ADMIN_UPDATE_PRODUCT_URL,
} from "../../config";

const renderProductManagement = () => {
  return (
    <div>
      <Link to={ADMIN_ADD_PRODUCT_URL}>Add Product</Link>
      <hr />
      <Link to={ADMIN_DELETE_PRODUCT_URL}>Delete Product</Link>
      <hr />
      <Link to={ADMIN_UPDATE_PRODUCT_URL}>Update Product</Link>
    </div>
  );
};

const ProductManagement = () => {
  return (
    <Layout title="Product Management">{renderProductManagement()}</Layout>
  );
};

export default ProductManagement;
