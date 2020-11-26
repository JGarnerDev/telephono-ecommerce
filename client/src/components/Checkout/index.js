import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "braintree-web";
import BrainTreeDropIn from "braintree-web-drop-in-react";

import UIMessage from "../UIMessage";

import { isAuth } from "../../auth";
import { getPaymentToken, processPayment, saveOrderData } from "./utils";

const Checkout = ({ products, emptyCart }) => {
  const [data, setData] = useState({
    success: false,
    paymentToken: null,
    error: "",
    instance: {},
    address: "",
  });

  const { user, token } = isAuth();

  const init = () => {
    getPaymentToken(user._id, token).then((res) => {
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

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  const confirmPurchase = () => {
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((confirmationData) => {
        nonce = confirmationData.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: totalCostOfCart(),
        };
        processPayment(user._id, token, paymentData)
          .then((res) => {
            const orderData = {
              //
              transaction_id: res.transaction._id,
              amount: res.transaction.amount,
              products: products,
              address: data.address,
              clientData: user,
            };

            saveOrderData(user._id, token, orderData);

            setData({ ...data, success: res.success });
            emptyCart(() => {
              // window.location.reload();
            });
          })
          .catch((error) => {});
      })
      .catch((error) => {
        setData({ ...data, error: error.message });
      });
  };

  const renderDropIn = () => {
    return data.paymentToken && products.length ? (
      <div onBlur={() => setData({ ...data, error: "" })}>
        <div>
          <label></label>
          <textarea
            onChange={handleAddress}
            value={data.address}
            placeholder="Shipping address"
          ></textarea>
        </div>
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
    return user ? (
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
