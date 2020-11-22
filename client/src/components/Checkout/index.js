import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "braintree-web";
import BrainTreeDropIn from "braintree-web-drop-in-react";

import UIMessage from "../UIMessage";

import { isAuth } from "../../auth";
import { getPaymentToken, processPayment } from "./utils";

const Checkout = ({ products, emptyCart }) => {
  const [data, setData] = useState({
    success: false,
    paymentToken: null,
    error: "",
    instance: {},
    address: "",
  });

  const {
    user: { _id },
    token,
  } = isAuth();

  const init = () => {
    getPaymentToken(_id, token).then((res) => {
      if (res.error) {
        setData({ ...data, error: res.error });
      } else {
        setData({ ...data, paymentToken: res.clientToken });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const confirmPurchase = () => {
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: totalCostOfCart(),
        };
        processPayment(_id, token, paymentData)
          .then((res) => {
            console.log(res);
            setData({ ...data, success: res.success });
            emptyCart(() => {
              window.location.reload();
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        setData({ ...data, error: error.message });
      });
  };

  const renderDropIn = () => {
    return data.paymentToken && products.length ? (
      <div onBlur={() => setData({ ...data, error: "" })}>
        <BrainTreeDropIn
          options={{
            authorization: data.paymentToken,
            paypal: { flow: "vault" },
          }}
          onInstance={(instance) => {
            setData({ ...data, instance });
          }}
        />
        <button onClick={confirmPurchase}>Check out</button>
      </div>
    ) : null;
  };

  const enableCheckout = () => {
    return _id ? (
      renderDropIn()
    ) : (
      <Link to="/signup">Register to confirm purchase</Link>
    );
  };

  const totalCostOfCart = () => {
    return products.reduce((sum, product) => {
      return sum + product.quantity * product.price;
    }, 0);
  };

  const renderError = () => {
    if (data.error) {
      return <UIMessage message={data.error} type="error" />;
    }
    if (data.success) {
      return (
        <UIMessage message={"Purchase confirmed - thank you!"} type="success" />
      );
    }
  };

  return (
    <div>
      <h2>Total cost: ${totalCostOfCart()}</h2>
      {enableCheckout()}
      {renderError()}
    </div>
  );
};

export default Checkout;
