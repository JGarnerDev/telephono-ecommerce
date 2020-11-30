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

import "./AllOrders.scss";

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
  const renderProductsInTransaction = (products) => {
    // <Link to={`/product/${_id}`}>
    // <h3>{name}</h3>
    // </Link>

    // name price description quantity _id
    return (
      <>
        <section className="order__productsInfo">
          <h2>Products</h2>
          {products.map(({ _id, name, price, quantity }) => {
            return (
              <div className="order__productsInfo__product">
                <Link to={`/product/${_id}`}>
                  <h3>{name}</h3>
                </Link>
                <p>Product id: {_id}</p>
                <p>Price per unit: ${price}</p>
                <p>Quantity: {quantity}</p>
              </div>
            );
          })}
        </section>
      </>
    );
  };

  const renderClientInfo = ({ name, _id, email }) => (
    <section className="order__clientInfo">
      <h2>Client</h2>
      <p>Client id: {_id}</p>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
    </section>
  );
  const renderOrderInfo = (address, _id, createdAt, amount) => (
    <section className="order__orderInfo">
      <h2>Order</h2>
      <p>Order id: {_id}</p>
      <p>Shipping address: {address}</p>
      <p>Total cost: ${amount}</p>
      <p>Time stamp: {createdAt}</p>
      <div className="order__orderInfo__status">
        <p>Order status:</p>
        <select
          onChange={(event) => handleShippingStatusChange(event, _id)}
          value={currentShippingStatusValues[_id]}
        >
          {shippingStatusOptions.map((statusOption) => {
            return <option value={statusOption}>{statusOption}</option>;
          })}
        </select>
      </div>
    </section>
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
      <div className="order">
        {renderOrderInfo(address, _id, createdAt, amount)}
        {renderClientInfo(clientData)}

        {renderProductsInTransaction(products)}
      </div>
    ));

  return (
    <Layout
      title="All Orders"
      description="View order information and adjust it's shipping status"
      page="AllOrders"
    >
      {renderOrders()}
    </Layout>
  );
};

export default AllOrders;
