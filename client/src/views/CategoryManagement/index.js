import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { isAuth } from "../../auth";

import Layout from "../../hoc/Layout";
import FormField from "../../components/FormField";

import { Button } from "@material-ui/core";

import {
  GET_CATEGORIES_ROUTE,
  ADMIN_ADD_CATEGORY_URL,
  UPDATE_CATEGORY_ROUTE,
} from "../../config";

import "./CategoryManagement.scss";

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
    <div className="category">
      <h2>{name}</h2>
      <FormField
        label="Change category name"
        value={names[_id] || ""}
        changeHandler={(e) => {
          setNames({ ...names, [_id]: e.target.value });
        }}
        required={true}
      />
      <div className="btn-wrapper">
        <Button
          onClick={() => {
            updateCategory(_id, names[_id]);
          }}
          variant="contained"
          color="primary"
        >
          Submit changes
        </Button>
        <Button
          onClick={() => {
            deleteCategory(_id);
          }}
          variant="contained"
          color="primary"
        >
          Delete category
        </Button>
      </div>
    </div>
  );

  const renderCategories = () => {
    return categories.map((category) => renderCategory(category));
  };

  return (
    <Layout
      title="Product Category management"
      description="Add, alter, or delete product categories"
      page="CategoryManagement"
    >
      <div id="CategoryManagement__wrapper">
        <div id="CategoryManagement__wrapper__add">
          <h2>Need a new category?</h2>
          <Link to={ADMIN_ADD_CATEGORY_URL}>Add a new one here</Link>
        </div>

        {renderCategories()}
      </div>
    </Layout>
  );
};

export default CategoryManagement;
