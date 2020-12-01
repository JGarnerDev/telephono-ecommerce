import React, { useState, useEffect } from "react";

import Layout from "../../hoc/Layout";
import { ProductCard } from "../../components/Product/index";
import Checkout from "../../components/Checkout";

import { getProductsFromCart, emptyCart } from "./utils";

import "./Cart.scss";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setCartProducts(getProductsFromCart());
  }, [update]);

  return (
    <Layout title="Cart" description="Confirm order details" page="Cart">
      {cartProducts.length ? (
        <div className="content-wrapper">
          <div id="products">
            {cartProducts.map((product) => (
              <ProductCard
                product={product}
                inCart={true}
                setUpdate={setUpdate}
                update={update}
              />
            ))}
          </div>
          <Checkout products={cartProducts} emptyCart={emptyCart} />
        </div>
      ) : (
        <h2>There are no products currently in your cart</h2>
      )}
    </Layout>
  );
};

export default Cart;
