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
import Shop from "./views/Shop";
import Product from "./views/Product";
import ProductManagement from "./views/ProductManagement";
import ProductEditor from "./views/ProductEditor";

// Product Categories
import CategoryManagement from "./views/CategoryManagement";
import AddCategory from "./views/CategoryManagement/Add";

// Orders

import AllOrders from "./views/AllOrders";
import UserOrders from "./views/UserOrders";

import {
  // Public
  SHOP_URL,
  PRODUCT_URL,
  // Auth
  SIGNUP_URL,
  LOGIN_URL,
  //// Client
  CLIENT_CART_URL,
  CLIENT_ACCOUNT_URL,
  CLIENT_ACCOUNT_UPDATE_URL,
  CLIENT_ORDER_HISTORY_URL,
  //// Admin
  ADMIN_ACCOUNT_URL,
  ADMIN_ACCOUNT_UPDATE_URL,
  // Products
  ADMIN_PRODUCT_MANAGEMENT_URL,
  ADMIN_VIEW_PRODUCTS_URL,
  ADMIN_ADD_PRODUCT_URL,
  ADMIN_UPDATE_PRODUCT_URL,
  // Categories
  ADMIN_CATEGORY_MANAGEMENT_URL,
  ADMIN_ADD_CATEGORY_URL,
  // Orders
  ADMIN_VIEW_ORDERS_URL,
} from "./config";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path={SHOP_URL} exact component={Shop} />
        <Route path={PRODUCT_URL + "/:productId"} exact component={Product} />
        <Route path={SIGNUP_URL} exact component={Signup} />
        <Route path={LOGIN_URL} exact component={Login} />

        {/* //////// Client Routes //////// */}

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
        <PrivateRoute
          path={CLIENT_ORDER_HISTORY_URL}
          exact
          component={UserOrders}
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
          component={() => <ProductEditor mode={"Add"} />}
        />

        {/* Update Product */}
        <AdministrativeRoute
          path={ADMIN_UPDATE_PRODUCT_URL + "/:productId"}
          exact
          component={() => <ProductEditor mode={"Update"} />}
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

        {/* View Orders */}
        <AdministrativeRoute
          path={ADMIN_VIEW_ORDERS_URL}
          exact
          component={AllOrders}
        />

      </Switch>
    </Router>
  );
};

export default Routes;
