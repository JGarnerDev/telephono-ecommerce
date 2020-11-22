import React, { useState, useEffect } from "react";

import Layout from "../../hoc/Layout";
import { ProductCard } from "../../components/Product/index";
import Checkout from "../../components/Checkout";

import { getProductsFromCart, emptyCart } from "./utils";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setCartProducts(getProductsFromCart());
  }, [update]);

  return (
    <Layout title="Cart">
      {cartProducts.length ? (
        <>
          {cartProducts.map((product) => (
            <ProductCard
              product={product}
              inCart={true}
              setUpdate={setUpdate}
              update={update}
            />
          ))}

          <Checkout products={cartProducts} emptyCart={emptyCart} />
        </>
      ) : (
        <h2>There's no products currently in your cart</h2>
      )}
    </Layout>
  );
};

export default Cart;
