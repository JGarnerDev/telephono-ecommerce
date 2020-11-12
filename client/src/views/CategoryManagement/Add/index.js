import React, { useReducer } from "react";
import { Link } from "react-router-dom";

import {
  addCategoryReducer,
  addCategoryInitialState,
} from "../../../store/AddCategory";

import Layout from "../../../hoc/Layout";

const AddCategory = () => {
  const [state, dispatch] = useReducer(
    addCategoryReducer,
    addCategoryInitialState
  );

  const {} = state;
  return <Layout title="Add a Product Category">{}</Layout>;
};

export default AddCategory;
