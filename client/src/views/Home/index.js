import React, { useReducer, useEffect } from "react";
import axios from "axios";

import { homeReducer, homeInitialState } from "../../store/Home";

import { GET_PRODUCTS_ROUTE } from "../../config";

import Layout from "../../hoc/Layout";
import { ProductCard } from "../../components/Product";

const Home = () => {
  const [state, dispatch] = useReducer(homeReducer, homeInitialState);
  const { productsBySales, productsByDate, sort, order, limit } = state;

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    getProductsBySales();
    getProductsByDate();
  };

  const getProductsBySales = () => {
    axios
      .get(GET_PRODUCTS_ROUTE + `?sortBy=sales&order=desc&limit=6`)
      .then((res) => {
        dispatch({ type: "productsBySales", value: res.data });
      });
  };
  const getProductsByDate = () => {
    axios
      .get(GET_PRODUCTS_ROUTE + `?sortBy=_id&order=desc&limit=6`)
      .then((res) => {
        dispatch({ type: "productsByDate", value: res.data });
      });
  };

  const renderPopularProducts = () => {
    return productsBySales.map((product, i) => {
      return <ProductCard product={product} key={i} />;
    });
  };

  const renderNewestProducts = () => {
    return productsByDate.map((product, i) => {
      return <ProductCard product={product} key={i} />;
    });
  };

  return (
    <Layout title="Home">
      <h2>Popular Products</h2>
      {renderPopularProducts()}
      <hr />
      <h2>Newest Additions</h2>
      {renderNewestProducts()}
    </Layout>
  );
};

export default Home;
