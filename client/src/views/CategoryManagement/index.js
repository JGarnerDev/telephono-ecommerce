import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { isAuth } from "../../auth";

import Layout from "../../hoc/Layout";
import FormField from "../../components/FormField";

import {
  GET_CATEGORIES_ROUTE,
  ADMIN_ADD_CATEGORY_URL,
  UPDATE_CATEGORY_ROUTE,
} from "../../config";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [names, setNames] = useState({});

  useEffect(() => {
    axios.get(GET_CATEGORIES_ROUTE).then((res) => {
      setCategories(res.data);
    });
  }, []);

  useEffect(() => {
    const categoryNames = {};
    categories &&
      categories.forEach((category) => {
        categoryNames[category._id] = category.name;
      });
    setNames(categoryNames);
  }, [categories]);

  const { user, token } = isAuth();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const updateCategory = (categoryId, name) => {
    axios
      .post(
        UPDATE_CATEGORY_ROUTE + "/" + categoryId + "/" + user._id,
        { name },
        config
      )
      .then((res) => {
        if (res.data.nModified) {
          window.location.reload();
        }
      });
  };
  const deleteCategory = (categoryId) => {
    axios
      .delete(GET_CATEGORIES_ROUTE + "/" + categoryId + "/" + user._id, config)
      .then(() => {
        window.location.reload();
      });
  };

  const renderCategory = ({ name, _id }) => (
    <div>
      <h2>{name}</h2>
      <FormField
        label="Change category name"
        value={names[_id] || ""}
        changeHandler={(e) => {
          setNames({ ...names, [_id]: e.target.value });
        }}
        required={true}
      />
      <button
        onClick={() => {
          updateCategory(_id, names[_id]);
        }}
      >
        Submit changes
      </button>
      <button
        onClick={() => {
          deleteCategory(_id);
        }}
      >
        Delete category
      </button>
    </div>
  );

  const renderCategories = () => {
    return categories.map((category) => renderCategory(category));
  };

  return (
    <Layout title="Product Category management">
      <Link to={ADMIN_ADD_CATEGORY_URL}>Add Product Category</Link>

      {renderCategories()}
    </Layout>
  );
};

export default CategoryManagement;
