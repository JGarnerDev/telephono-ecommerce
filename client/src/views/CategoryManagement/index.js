import React from "react";
import { Link } from "react-router-dom";

import Layout from "../../hoc/Layout";

import {
  ADMIN_ADD_CATEGORY_URL,
  ADMIN_DELETE_CATEGORY_URL,
  ADMIN_UPDATE_CATEGORY_URL,
} from "../../config";

const renderCategoryManagement = () => {
  return (
    <div>
      <Link to={ADMIN_ADD_CATEGORY_URL}>Add Product Category</Link>
      <hr />
      <Link to={ADMIN_DELETE_CATEGORY_URL}>Delete Product Category</Link>
      <hr />
      <Link to={ADMIN_UPDATE_CATEGORY_URL}>Update Product Category</Link>
    </div>
  );
};

const CategoryManagement = () => {
  return (
    <Layout title="Product Category management">
      {renderCategoryManagement()}
    </Layout>
  );
};

export default CategoryManagement;
