import React, { useReducer } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import {
  addProductReducer,
  addProductInitialState,
} from "../../../store/AddProduct";

import { isAuth } from "../../../auth";

import { ADD_PRODUCT_ROUTE } from "../../../config";

import Layout from "../../../hoc/Layout";
import FormField from "../../../components/FormField";
import UIMessage from "../../../components/UIMessage";

import { Button } from "@material-ui/core";

const ProductManagement = () => {
  const [state, dispatch] = useReducer(
    addProductReducer,
    addProductInitialState
  );

  const { error, renderError, loading, success } = state;

  if (success) {
    return <Redirect to="/" />;
  }

  const { user, token } = isAuth();
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const attemptNewProduct = (product) => {
    // Create a formData object
    const formData = new FormData();
    // Append all values to the formData
    delete product.category;
    Object.keys(product).forEach((productKey) => {
      formData.append(productKey, product[productKey]);
    });

    axios
      .post(`${ADD_PRODUCT_ROUTE + "/" + user._id}`, formData, config)
      .then(() => {
        dispatch({ type: "success" });
      })
      .catch((error) => {
        dispatch({ type: "error", value: error });
      });
  };

  const submit = async (e) => {
    console.log(state.product);
    attemptNewProduct(state.product);
  };

  const renderForm = () => {
    const {
      name,
      category,
      description,
      price,
      quantity,
      shipping,
      img,
    } = state.product;

    return (
      <form action="">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            dispatch({
              type: "fieldChange",
              field: "img",
              value: e.target.files[0],
            });
          }}
        />

        {[
          ["name", name, true],
          ["description", description, false],
          ["price", price, true],
          ["quantity", quantity, false],
        ].map((field, i) => {
          return (
            <FormField
              label={field[0]}
              value={field[1]}
              required={field[2]}
              changeHandler={(e) =>
                dispatch({
                  type: "fieldChange",
                  field: field[0],
                  value: e.currentTarget.value,
                })
              }
              key={i}
            />
          );
        })}

        <Button variant="contained" color="primary" onClick={submit}>
          Submit
        </Button>
        <select
          name="category"
          value={category}
          onChange={(e) => {
            dispatch({
              type: "fieldChange",
              field: "category",
              value: e.target.value,
            });
          }}
        >
          <option value={undefined}>No</option>
          <option value="YYYY">YYYY</option>
          <option value="YYYY">YYYY</option>
          <option value="YYYY">YYYY</option>
        </select>
        <select
          name="shipping"
          value={shipping}
          onChange={(e) => {
            dispatch({
              type: "fieldChange",
              field: "shipping",
              value: e.target.value,
            });
          }}
        >
          <option value={1}>Yes</option>
          <option value={0}>No</option>
        </select>
        {loading ? <p>FICK</p> : null}
        {renderError ? <UIMessage message={error} type="error" /> : null}
        {success ? <UIMessage message={success} type="success" /> : null}
      </form>
    );
  };

  return <Layout title="Add a Product">{renderForm()}</Layout>;
};

export default ProductManagement;
