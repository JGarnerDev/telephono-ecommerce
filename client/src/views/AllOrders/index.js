import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Layout from "../../hoc/Layout";

import { isAuth } from "../../auth";

import {
  GET_ORDERS_ROUTE,
  GET_SHIPPING_STATUS_VALUES_ROUTE,
  UPDATE_SHIPPING_STATUS_ROUTE,
} from "../../config";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [shippingStatusOptions, setShippingStatusOptions] = useState([]);
  const [
    currentShippingStatusValues,
    setCurrentShippingStatusValues,
  ] = useState({});

  const {
    user: { _id },
    token,
  } = isAuth();
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    axios.get(GET_ORDERS_ROUTE + `/${_id}`, config).then((res) => {
      const orders = res.data;
      setOrders(orders);
      const currentShippingValues = {};
      orders.forEach((order) => {
        currentShippingValues[order._id] = order.status;
      });
      setCurrentShippingStatusValues(currentShippingValues);
    });
    axios
      .get(GET_SHIPPING_STATUS_VALUES_ROUTE + `/${_id}`, config)
      .then((res) => {
        setShippingStatusOptions(res.data);
      });
  }, []);

  //user, status, _id, products, createdAt
  const renderProductsInTransaction = (products) =>
    products.map(({ _id, name, quantity, description, price }) => (
      <div>
        <Link to={`/product/${_id}`}>
          <h3>{name}</h3>
        </Link>
        <div>Product description: {description}</div>
        <div>Price per unit: ${price}</div>
        <div>Quantity sold: {quantity}</div>
        <div>Product id: {_id}</div>
        <hr />
      </div>
    ));

  const renderClientInfo = ({ name, _id, email }) => (
    <div>
      <h2>Client</h2>
      <div>Name: {name}</div>
      <div>Email: {email}</div>
      <div>Client id: {_id}</div>
    </div>
  );

  const handleShippingStatusChange = (event, orderId) => {
    const newStatus = event.target.value;
    setCurrentShippingStatusValues({
      ...currentShippingStatusValues,
      [orderId]: newStatus,
    });
    axios.post(
      UPDATE_SHIPPING_STATUS_ROUTE + `/${_id}/${orderId}`,
      { newStatus },
      config
    );
  };

  const renderOrders = () =>
    orders.map(({ address, _id, products, createdAt, amount, clientData }) => (
      <div>
        {renderClientInfo(clientData)}
        <h2>Order</h2>
        <div>Shipping address: {address}</div>
        <div>Order status:</div>
        <select
          onChange={(event) => handleShippingStatusChange(event, _id)}
          value={currentShippingStatusValues[_id]}
        >
          {shippingStatusOptions.map((statusOption) => {
            return <option value={statusOption}>{statusOption}</option>;
          })}
        </select>
        <div>Order id: {_id}</div>
        <hr />
        <h2>Products</h2>
        {renderProductsInTransaction(products)}
        <div>Time stamp: {createdAt}</div>
        <div>Total cost: ${amount}</div>
        <hr />
      </div>
    ));

  return <Layout title="Orders">{renderOrders()}</Layout>;
};

export default AllOrders;
