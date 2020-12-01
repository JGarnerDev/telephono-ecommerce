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

import "./ProductManagement.scss";

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
    <div id="ProductManagement__wrapper__sort">
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
    </div>
  );

  const renderProduct = ({ name, _id, quantity, sales, createdAt }) => (
    <div className="product">
      <h2>{name}</h2>
      <p>Product id: {_id}</p>
      <p>Units remaining: {quantity}</p>
      <p>Units sold: {sales} </p>
      <p>Created at: {createdAt}</p>
      <Link to={ADMIN_UPDATE_PRODUCT_URL + "/" + _id}>Edit product</Link>
    </div>
  );

  const renderProducts = () => {
    return products.map((product) => renderProduct(product));
  };

  return (
    <Layout
      title="Product management"
      description="Add or edit products"
      page="ProductManagement"
    >
      <div id="ProductManagement__wrapper">
        <div id="ProductManagement__wrapper__add">
          <h2>Have a new product?</h2>
          <Link to={ADMIN_ADD_PRODUCT_URL}>Add one here</Link>
        </div>

        {renderSortOptions()}
        <div id="ProductManagement__wrapper__products">{renderProducts()}</div>
      </div>
    </Layout>
  );
};

export default ProductManagement;
