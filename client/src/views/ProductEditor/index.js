import React, { useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";

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

import { Button } from "@material-ui/core";

import "./ProductEditor.scss";

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

  const renderCurrentProductImage = () => (
    <div id="img-current">
      <h2>Current image</h2>
      <ProductImage _id={productId} />
    </div>
  );

  const renderProductImagePreview = () => (
    <div id="img-updated">
      <h2>Selected image</h2>
      <ProductImage
        image={product.img && URL.createObjectURL(product.img)}
        isPreview={true}
      />
    </div>
  );

  const renderImageInput = () => (
    <div id="imgUpdater">
      <h3>Change product image?</h3>
      <label for="img">Upload new image</label>
      <input
        type="file"
        accept="image/*"
        id="img"
        onChange={(e) => {
          dispatch({
            type: "fieldChange",
            field: "img",
            value: e.target.files[0],
          });
        }}
      />
    </div>
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
    <div id="selectors">
      <div>
        <h3>Product category:</h3>
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
      </div>
      <div>
        <h3>Shipping?</h3>
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
          <option value={1}>Shipping allowed</option>
          <option value={0}>Shipping disabled</option>
        </select>
      </div>
    </div>
  );

  const renderAddProductForm = () => {
    return (
      <>
        <h2>Enter product information</h2>
        {renderFieldsForUpdating(false)}
        {renderSelectors()}
      </>
    );
  };

  const renderUpdateProductForm = () => {
    return (
      <>
        <h2>Update current information</h2>
        {renderFieldsForUpdating(true)}
        {renderSelectors()}
      </>
    );
  };

  return (
    <Layout
      title={`${mode} product`}
      page="ProductEditor"
      description={`Change the details of ${product.name}`}
    >
      <div id="wrapper" className={`${mode}`}>
        <div id="images">
          {mode === "Update" ? renderCurrentProductImage() : null}
          {renderProductImagePreview()}
        </div>
        <form>
          {renderImageInput()}
          {mode === "Update"
            ? renderUpdateProductForm()
            : renderAddProductForm()}

          <Button
            id="ProductEditor__wrapper__button"
            onClick={submit}
            variant="contained"
            color="primary"
          >{`${mode} this product`}</Button>
        </form>
      </div>
    </Layout>
  );
};

export default ProductEditor;
