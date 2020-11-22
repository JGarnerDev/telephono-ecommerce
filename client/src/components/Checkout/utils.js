import { GET_PURCHASE_TOKEN_ROUTE, PROCESS_PURCHASE_ROUTE } from "../../config";
import axios from "axios";

export const getPaymentToken = (userId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios
    .get(GET_PURCHASE_TOKEN_ROUTE + `/${userId}`, config)
    .then((res) => {
      return res.data;
    });
};

export const processPayment = (userId, token, paymentData) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios
    .post(PROCESS_PURCHASE_ROUTE + `/${userId}`, paymentData, config)
    .then((res) => {
      return res.data;
    });
};
