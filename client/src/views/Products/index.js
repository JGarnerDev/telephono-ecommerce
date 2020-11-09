import React from "react";
import { Link, withRouter } from "react-router-dom";

import Layout from "../../hoc/Layout";

const renderProducts = () => {
  return <div className="">ASS</div>;
};

const Products = () => {
  return <Layout title="Products">{renderProducts()}</Layout>;
};

export default Products;
