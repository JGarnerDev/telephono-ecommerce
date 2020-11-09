import React, { useReducer } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import { USER_LOGIN_ROUTE } from "../../config";
import { authenticateUser } from "../../auth";
import { loginReducer, loginInitialState } from "../../store/Login";

import Layout from "../../hoc/Layout";
import FormField from "../../components/FormField";
import UIMessage from "../../components/UIMessage";

import { Button } from "@material-ui/core";

const Login = () => {
  const [state, dispatch] = useReducer(loginReducer, loginInitialState);
  const { Email, Password, Error, RenderError, Loading, Success } = state;

  if (Success) {
    return <Redirect to="/" />;
  }

  const attemptLogin = (Email, Password) => {
    axios
      .get(`${USER_LOGIN_ROUTE}`, { Email, Password })
      .then((data) => {
        authenticateUser(data, () => {
          dispatch({ type: "success" });
        });
      })
      .catch((error) => {
        dispatch({ type: "error", value: error.response.data.error });
      });
  };

  let timeout;

  const submit = async (e) => {
    e.preventDefault();
    dispatch({ type: "clearError" });
    dispatch({ type: "loading" });
    if (timeout) {
      clearTimeout(timeout);
    }
    await attemptLogin(Email, Password);
    dispatch({ type: "loadComplete" });
    timeout = setTimeout(() => {
      dispatch({ type: "clearError" });
    }, 2000);
  };

  const renderForm = () => {
    return (
      <form action="">
        {[
          ["Email", Email, true],
          ["Password", Password, true],
        ].map((field, i) => {
          return (
            <FormField
              label={field[0]}
              value={field[1]}
              required={field[2]}
              changeHandler={(e) =>
                dispatch({
                  type: "fieldChange",
                  field: field[0],
                  value: e.currentTarget.value,
                })
              }
              key={i}
            />
          );
        })}
        <Button variant="contained" color="primary" onClick={submit}>
          Submit
        </Button>
        {Loading ? <p>FICK</p> : null}
        {RenderError ? <UIMessage message={Error} type="error" /> : null}
        {Success ? <UIMessage message={Success} type="success" /> : null}
      </form>
    );
  };
  return <Layout title="Log in">{renderForm()}</Layout>;
};

export default Login;
