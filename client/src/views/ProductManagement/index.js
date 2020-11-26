import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Layout from "../../hoc/Layout";

import {
  GET_PRODUCTS_ROUTE,
  ADMIN_ADD_PRODUCT_URL,
  ADMIN_VIEW_PRODUCTS_URL,
  ADMIN_UPDATE_PRODUCT_URL,
} from "../../config";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("_id");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    axios
      .get(GET_PRODUCTS_ROUTE + `?sortBy=${sortBy}&order=${order}&limit=20`)
      .then((res) => {
        setProducts(res.data);
      });
  }, [sortBy, order]);

  const renderSortOptions = () => (
    <>
    <select
      value={sortBy}
      onChange={(e) => {
        setSortBy(e.target.value);
      }}
    >
      {[
        ["_id", "Date"],
        ["sales", "Sales"],
      ].map((sortValue, i) => {
        return (
          <option value={sortValue[0]} key={i}>
            {sortValue[1]}
          </option>
        );
      })}
    </select>
    <select
      value={order}
      onChange={(e) => {
        setOrder(e.target.value);
      }}
    >
      {[
        ["asc", "Ascending"],
        ["desc", "Descending"],
      ].map((sortOrder, i) => {
        return (
          <option value={sortOrder[0]} key={i}>
            {sortOrder[1]}
          </option>
        );
      })}
    </select>
    </>
  );

  const renderProduct = ({ name, _id, quantity, sales }) => (
    <div>
      <h2>{name}</h2>
      <p>Product id: {_id}</p>
      <p>Units remaining: {quantity}</p>
      <p>Units sold: {sales} </p>
      <Link to={ADMIN_UPDATE_PRODUCT_URL + "/" + _id}>Edit product</Link>
    </div>
  );

  const renderProducts = () => {
    return products.map((product) => renderProduct(product));
  };

  return (
    <Layout title="Product management">
      <Link to={ADMIN_ADD_PRODUCT_URL}>Add a new product</Link>
      {renderSortOptions()}
      {renderProducts()}
    </Layout>
  );
};

export default ProductManagement;
