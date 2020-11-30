import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Layout from "../../hoc/Layout";

import { isAuth } from "../../auth";

import { GET_USER_ORDERS_ROUTE } from "../../config";

import "./UserOrders.scss";

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
    <ul className="order__products">
      <h2>Products ordered</h2>
      {products.map(({ _id: productId, quantity, name, price }) => (
        <li className="order__products__product">
          <p>Name: {name} </p>
          <p>Id: {productId} </p>
          <p>Quantity: {quantity} </p>
          <p>Price per unit: ${price} </p>
        </li>
      ))}
    </ul>
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
    <section className="order">
      <h2>Order information</h2>
      <p>Your id: {userId}</p>
      <p>Order id: {orderId}</p>
      <p>Shipped to: {address}</p>
      <p>Order status: {status} </p>
      <p>Date of order: {createdAt}</p>
      <p>Last updated at: {updatedAt} </p>
      <p>Amount charged: ${amount}</p>
      {renderProducts(products)}
    </section>
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

  return (
    <Layout
      title="Your order history"
      description="Here's all the details"
      page="UserOrders"
    >
      {renderOrders()}
    </Layout>
  );
};

export default Orders;
