import React, { useState, useEffect } from "react";

import Layout from "../../hoc/Layout";
import { ProductCard } from "../../components/Product/index";

import { getProductsFromCart } from "./utils";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    setCartProducts(getProductsFromCart());
  }, []);

  const renderCartProducts = () => {
    return cartProducts.map((product) => {
      return <ProductCard product={product} />;
    });
  };

  return <Layout title="Cart">{renderCartProducts()}</Layout>;
};

export default Cart;
