import React, { useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import {
  productEditorInitialState,
  productEditorReducer,
} from "../../store/ProductEditor";

import { isAuth } from "../../auth";
import {
  getCurrentCategories,
  getDataForProductUpdate,
  convertProductToFormData,
  createNewProduct,
  updateProduct,
} from "./utils";

import Layout from "../../hoc/Layout";
import { ProductImage } from "../../components/Product";
import FormField from "../../components/FormField";
import UIMessage from "../../components/UIMessage";

import { Button } from "@material-ui/core";

const ProductEditor = ({ mode }) => {
  const [state, dispatch] = useReducer(productEditorReducer, {
    ...productEditorInitialState,
    mode,
  });
  const userData = isAuth();
  const productId = useParams().productId;

  useEffect(() => {
    const init = async () => {
      if (mode === "Update") {
        const data = await getDataForProductUpdate(productId);

        dispatch({
          type: "setUpdateModeData",
          product: data.product,
          categories: data.categories,
        });
      } else {
        const data = await getCurrentCategories();
        dispatch({ type: "setCategories", value: data });
      }
    };
    init();
  }, []);

  const { categories, product, error, renderError, loading, success } = state;

  let timeout;

  const submit = async (e) => {
    const formData = convertProductToFormData(product);

    switch (mode) {
      case "Update":
        updateProduct(productId, formData, userData);
        return;
      case "Add":
        createNewProduct(formData, userData);
        return;
      default:
        return;
    }
  };

  const renderCurrentProductImage = () => <ProductImage _id={productId} />;

  const renderImageInput = () => (
    <>
      <ProductImage
        image={product.img && URL.createObjectURL(product.img)}
        isPreview={true}
      />
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
    </>
  );

  const renderFieldsForUpdating = (forUpdate) =>
    [
      ["name", true],
      ["description", false],
      ["price", true],
      ["quantity", false],
    ].map((field, i) => {
      return (
        <FormField
          label={field[0]}
          value={product[field[0]]}
          changeHandler={(e) => {
            e.preventDefault();
            dispatch({
              type: "fieldChange",
              field: field[0],
              value: e.currentTarget.value,
            });
          }}
          placeholder={forUpdate ? product[field[0]] : null}
          required={field[1]}
          key={i}
        />
      );
    });

  const renderSelectors = () => (
    <>
      <select
        name="category"
        value={product.category}
        onChange={(e) => {
          e.preventDefault();
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
        value={product.shipping}
        onChange={(e) => {
          e.preventDefault();
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
    </>
  );

  const renderAddProductForm = () => {
    return (
      <>
        {renderImageInput()}
        {renderFieldsForUpdating(false)}
        {renderSelectors()}
      </>
    );
  };

  const renderUpdateProductForm = () => {
    return (
      <>
        {renderCurrentProductImage()}
        {renderImageInput()}
        {renderFieldsForUpdating(true)}
        {renderSelectors()}
      </>
    );
  };

  return (
    <Layout title={`${mode} product`}>
      <form action="">
        {mode === "Update" ? renderUpdateProductForm() : renderAddProductForm()}
      </form>
      <button onClick={submit}>{`${mode} this product`}</button>
    </Layout>
  );
};

export default ProductEditor;
