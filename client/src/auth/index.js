import axios from "axios";

import { USER_LOGOUT_ROUTE } from "../config";

export const authenticateUser = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const isAuth = () => {
  if (typeof window !== "undefined" && localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  }
  return false;
};

export const logOut = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    axios
      .get(USER_LOGOUT_ROUTE)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
