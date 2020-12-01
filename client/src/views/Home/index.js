import React, { useReducer, useEffect } from "react";
import axios from "axios";

import { homeReducer, homeInitialState } from "../../store/Home";

import { GET_PRODUCTS_ROUTE } from "../../config";

import Layout from "../../hoc/Layout";
import Search from "../../components/Search";
import { ProductCard } from "../../components/Product";

import "./Home.scss";

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
      .get(GET_PRODUCTS_ROUTE + `?sortBy=sales&order=desc&limit=3`)
      .then((res) => {
        dispatch({ type: "productsBySales", value: res.data });
      });
  };
  const getProductsByDate = () => {
    axios
      .get(GET_PRODUCTS_ROUTE + `?sortBy=_id&order=desc&limit=3`)
      .then((res) => {
        dispatch({ type: "productsByDate", value: res.data });
      });
  };

  const renderPopularProducts = () => {
    return (
      <section id="popular_products" className="display">
        <h3 className="display__heading">Most popular</h3>
        <>
          <div className="stripe" />
          {productsBySales.map((product, i) => {
            return <ProductCard product={product} key={i} />;
          })}
        </>
      </section>
    );
  };

  const renderNewestProducts = () => {
    return (
      <section id="newest_products" className="display">
        <h3 className="display__heading">New Releases</h3>
        <>
          <div className="stripe" />
          {productsByDate.map((product, i) => {
            return <ProductCard product={product} key={i} />;
          })}
        </>
      </section>
    );
  };

  return (
    <Layout
      title="TelePhono"
      page="Home"
      description="Reach out, get connected"
    >
      <div id="oval"></div>
      {productsByDate[0] && (
        <ProductCard product={productsByDate[0]} showcase={true} />
      )}

      <Search />

      {renderNewestProducts()}

      {renderPopularProducts()}
    </Layout>
  );
};

export default Home;
