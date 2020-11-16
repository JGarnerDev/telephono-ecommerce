import React from "react";
import { Link } from "react-router-dom";

import Layout from "../../hoc/Layout";

import { ADMIN_ADD_CATEGORY_URL } from "../../config";

const renderCategoryManagement = () => {
  return (
    <div>
      <Link to={ADMIN_ADD_CATEGORY_URL}>Add Product Category</Link>
      <hr />
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
