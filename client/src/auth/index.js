import axios from "axios";
import { Redirect } from "react-router-dom";

import { USER_LOGOUT_ROUTE } from "../config";

export const authenticateUser = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const isAuth = () => {
  if (typeof window !== "undefined" && localStorage.getItem("jwt")) {
    const userData = JSON.parse(localStorage.getItem("jwt"));

    return userData;
  }
  return false;
};
export const isAdmin = () => {
  if (typeof window !== "undefined" && localStorage.getItem("jwt")) {
    const userData = JSON.parse(localStorage.getItem("jwt"));
    if (userData.user.role) {
      return true;
    }
  }
  return false;
};

export const redirectAdmin = (user) => {
  if (user.role) {
    return <Redirect to="/admin/account" />;
  }
};

export const logOut = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    axios
      .get(USER_LOGOUT_ROUTE)
      .then((res) => {
        //
      })
      .catch((err) => {
        //
      });
  }
};
