import React, { useReducer, useEffect } from "react";
import axios from "axios";

import { homeReducer, homeInitialState } from "../../store/Home";

import { GET_PRODUCTS_ROUTE } from "../../config";

import Layout from "../../hoc/Layout";
import { ProductCard } from "../../components/Product";

const Shop = () => {
  return <Layout title="Shop"></Layout>;
};

export default Shop;
