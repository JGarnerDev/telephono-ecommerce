import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Layout from "../../hoc/Layout";

import { isAuth } from "../../auth";

import { GET_USER_ORDERS_ROUTE } from "../../config";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const {
    user: { _id },
    token,
  } = isAuth();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    axios
      .get(GET_USER_ORDERS_ROUTE + "/" + _id, config)
      .then((res) => setOrders(res.data));
  }, []);

  //user, status, _id, products, createdAt

  const renderProducts = (products) => (
    <div>
      {products.map(
        ({ _id: productId, quantity, name, description, price }) => (
          <div>
            <p>Name: {name} </p>
            <p>Product id: {productId} </p>
            <p>Quantity: {quantity} </p>
            <p>Price: ${price} </p>
            <p>Description: {description} </p>
          </div>
        )
      )}
    </div>
  );

  const renderOrder = ({
    status,
    _id: orderId,
    amount,
    products,
    address,
    user: userId,
    createdAt,
    updatedAt,
  }) => (
    <div>
      <p>
        Order status: {status} (last updated at: ${updatedAt} )
      </p>
      <p>Order id: {orderId}</p>
      <p>Date of order: {createdAt}</p>
      <p>Your user id: {userId}</p>
      <p>Amount charged: {amount}</p>
      <p>Shipped to: {address}</p>
      {renderProducts(products)}
      <hr />
    </div>
  );

  const renderOrders = () => (
    <>
      {orders.map((order) => {
        {
          return renderOrder(order);
        }
      })}
    </>
  );

  return <Layout title="Your order history">{renderOrders()}</Layout>;
};

export default Orders;
