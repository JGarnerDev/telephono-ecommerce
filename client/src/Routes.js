import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./Private.Routes";
import AdministrativeRoute from "./Admin.Routes";

import Home from "./views/Home";

// Auth
import Login from "./views/Login";
import Signup from "./views/Signup";

// Client
import Cart from "./views/Cart";
import UserAcccount from "./views/UserAccount";
import UpdateAccount from "./views/UpdateAccount";

// Products
import ProductManagement from "./views/ProductManagement";
import AddProduct from "./views/ProductManagement/Add";
import DeleteProduct from "./views/ProductManagement/Delete";
import UpdateProduct from "./views/ProductManagement/Update";

// Product Categories
import CategoryManagement from "./views/CategoryManagement";
import AddCategory from "./views/CategoryManagement/Add";
import DeleteCategory from "./views/CategoryManagement/Delete";
import UpdateCategory from "./views/CategoryManagement/Update";

import {
  // Auth
  SIGNUP_URL,
  LOGIN_URL,
  // Client
  CLIENT_CART_URL,
  CLIENT_ACCOUNT_URL,
  CLIENT_ACCOUNT_UPDATE_URL,
  // Admin
  ADMIN_ACCOUNT_URL,
  ADMIN_ACCOUNT_UPDATE_URL,
  // Products
  ADMIN_PRODUCT_MANAGEMENT_URL,
  ADMIN_ADD_PRODUCT_URL,
  ADMIN_DELETE_PRODUCT_URL,
  ADMIN_UPDATE_PRODUCT_URL,
  // Categories
  ADMIN_CATEGORY_MANAGEMENT_URL,
  ADMIN_ADD_CATEGORY_URL,
  ADMIN_DELETE_CATEGORY_URL,
  ADMIN_UPDATE_CATEGORY_URL,
} from "./config";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path={SIGNUP_URL} exact component={Signup} />
        <Route path={LOGIN_URL} exact component={Login} />
        {/*  */}
        <PrivateRoute path={CLIENT_CART_URL} exact component={Cart} />
        <PrivateRoute
          path={CLIENT_ACCOUNT_URL}
          exact
          component={UserAcccount}
        />
        <PrivateRoute
          path={CLIENT_ACCOUNT_UPDATE_URL}
          exact
          component={UpdateAccount}
        />

        {/* //////// Admin Routes //////// */}

        {/* //// Account ////  */}

        {/* Account Details */}
        <AdministrativeRoute
          path={ADMIN_ACCOUNT_URL}
          exact
          component={UserAcccount}
        />

        {/* Update Details */}
        <AdministrativeRoute
          path={ADMIN_ACCOUNT_UPDATE_URL}
          exact
          component={UpdateAccount}
        />

        {/* //// Manage Products //// */}
        <AdministrativeRoute
          path={ADMIN_PRODUCT_MANAGEMENT_URL}
          exact
          component={ProductManagement}
        />

        {/* Add Product */}
        <AdministrativeRoute
          path={ADMIN_ADD_PRODUCT_URL}
          exact
          component={AddProduct}
        />

        {/* Delete Product */}
        <AdministrativeRoute
          path={ADMIN_DELETE_PRODUCT_URL}
          exact
          component={DeleteProduct}
        />

        {/* Update Product */}
        <AdministrativeRoute
          path={ADMIN_UPDATE_PRODUCT_URL}
          exact
          component={UpdateProduct}
        />

        {/* //// Manage Product Categories //// */}
        <AdministrativeRoute
          path={ADMIN_CATEGORY_MANAGEMENT_URL}
          exact
          component={CategoryManagement}
        />

        {/* Add Product Category */}
        <AdministrativeRoute
          path={ADMIN_ADD_CATEGORY_URL}
          exact
          component={AddCategory}
        />

        {/* Delete Product Category */}
        <AdministrativeRoute
          path={ADMIN_DELETE_CATEGORY_URL}
          exact
          component={DeleteCategory}
        />

        {/* Update Product Category */}
        <AdministrativeRoute
          path={ADMIN_UPDATE_CATEGORY_URL}
          exact
          component={UpdateCategory}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
