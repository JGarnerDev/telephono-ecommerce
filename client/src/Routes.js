import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./Private.Routes";
import AdministrativeRoute from "./Admin.Routes";

import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Cart from "./views/Cart";
import UserAcccount from "./views/UserAccount";
import UpdateAccount from "./views/UpdateAccount";
import ProductManagement from "./views/ProductManagement";

import {
  SIGNUP_URL,
  LOGIN_URL,
  CLIENT_CART_URL,
  CLIENT_ACCOUNT_URL,
  CLIENT_ACCOUNT_UPDATE_URL,
  ADMIN_ACCOUNT_URL,
  ADMIN_ACCOUNT_UPDATE_URL,
  ADMIN_MANAGEMENT_URL,
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
        {/*  */}
        <AdministrativeRoute
          path={ADMIN_MANAGEMENT_URL}
          exact
          component={ProductManagement}
        />
        <AdministrativeRoute
          path={ADMIN_ACCOUNT_URL}
          exact
          component={UserAcccount}
        />
        <AdministrativeRoute
          path={ADMIN_ACCOUNT_UPDATE_URL}
          exact
          component={UpdateAccount}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
