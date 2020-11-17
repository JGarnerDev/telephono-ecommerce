import React, { useReducer, useEffect } from "react";
import axios from "axios";

import {
  addProductReducer,
  addProductInitialState,
} from "../../../store/AddProduct";

import { isAuth } from "../../../auth";

import { GET_CATEGORIES_ROUTE, ADD_PRODUCT_ROUTE } from "../../../config";

import Layout from "../../../hoc/Layout";
import FormField from "../../../components/FormField";
import UIMessage from "../../../components/UIMessage";

import { Button } from "@material-ui/core";

const AddProduct = () => {
  const [state, dispatch] = useReducer(
    addProductReducer,
    addProductInitialState
  );

  const { categories, error, renderError, loading, success } = state;
  const { user, token } = isAuth();

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    axios.get(GET_CATEGORIES_ROUTE).then((res) => {
      dispatch({ type: "categories", value: res.data });
    });
  };

  const attemptNewProduct = (product) => {
    // Create a formData object
    const formData = new FormData();
    // Append all values to the formData
    if (product.category.length === 0) {
      delete product.category;
    }
    Object.keys(product).forEach((productKey) => {
      formData.append(productKey, product[productKey]);
    });

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(`${ADD_PRODUCT_ROUTE + "/" + user._id}`, formData, config)
      .then(() => {
        dispatch({ type: "success", value: "Product successfully added!" });
      })
      .catch((error) => {
        dispatch({ type: "error", value: error });
      });
  };

  let timeout;

  const submit = async (e) => {
    e.preventDefault();
    dispatch({ type: "clearError" });

    if (timeout) {
      clearTimeout(timeout);
    }

    dispatch({ type: "loading" });
    await attemptNewProduct(state.product);
    dispatch({ type: "loadComplete" });
    timeout = setTimeout(() => {
      dispatch({ type: "clearError" });
    }, 2000);
  };

  const renderForm = () => {
    const {
      name,
      category,
      description,
      price,
      quantity,
      shipping,
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
          <option value="">None</option>
          {categories.map((category, i) => {
            return (
              <option value={category._id} key={i}>
                {category.name}
              </option>
            );
          })}
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

        <Button variant="contained" color="primary" onClick={submit}>
          Submit
        </Button>
        {loading ? <p>FICK</p> : null}
        {renderError ? <UIMessage message={error} type="error" /> : null}
        {success ? <UIMessage message={success} type="success" /> : null}
      </form>
    );
  };

  return <Layout title="Add a Product">{renderForm()}</Layout>;
};

export default AddProduct;
