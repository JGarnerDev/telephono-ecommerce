import axios from "axios";

import {
  GET_CATEGORIES_ROUTE,
  GET_PRODUCTS_ROUTE,
  ADD_PRODUCT_ROUTE,
  UPDATE_PRODUCT_ROUTE,
} from "../../config";

export const getCurrentCategories = () => {
  return axios.get(GET_CATEGORIES_ROUTE).then((res) => {
    return res.data;
  });
};

export const getCurrentProductInfo = (_id) => {
  return axios.get(GET_PRODUCTS_ROUTE + "/" + _id).then((res) => {
    return res.data;
  });
};

export const getDataForProductUpdate = (_id) => {
  const getCats = axios.get(GET_CATEGORIES_ROUTE);
  const getProd = axios.get(GET_PRODUCTS_ROUTE + "/" + _id);
  return axios.all([getCats, getProd]).then((res) => {
    const data = { categories: res[0].data, product: res[1].data[0] };
    return data;
  });
};

export const convertProductToFormData = (product) => {
  const formData = new FormData();
  if (product.category && product.category.length === 0) {
    delete product.category;
  }
  Object.keys(product).forEach((productKey) => {
    formData.append(productKey, product[productKey]);
  });
  return formData;
};

export const createNewProduct = (formData, userData) => {
  const config = {
    headers: { Authorization: `Bearer ${userData.token}` },
  };
  axios
    .post(`${ADD_PRODUCT_ROUTE + "/" + userData.user._id}`, formData, config)
    .then((res) => {
      return res.data;
    });
};

export const updateProduct = (productId, formData, userData) => {
  const config = {
    headers: { Authorization: `Bearer ${userData.token}` },
  };

  axios
    .post(
      `${UPDATE_PRODUCT_ROUTE + "/" + productId + "/" + userData.user._id}`,
      formData,
      config
    )
    .then((res) => {
      return res.data;
    });
};
