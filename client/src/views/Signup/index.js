import React, { useReducer } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import { USER_SIGNUP_ROUTE } from "../../config";
import { authenticateUser } from "../../auth";
import { signupReducer, signupInitialState } from "../../store/Signup";

import Layout from "../../hoc/Layout";
import FormField from "../../components/FormField";
import UIMessage from "../../components/UIMessage";

import { Button, FormControlLabel, Checkbox } from "@material-ui/core";
import { Build, BuildOutlined } from "@material-ui/icons";

import "./Signup.scss";

const Signup = () => {
  const [state, dispatch] = useReducer(signupReducer, signupInitialState);

  const {
    Name,
    Email,
    Password,
    ["Confirm password"]: confirmPassword,
    Admin,
    Error,
    RenderError,
    Loading,
    Success,
  } = state;

  if (Success) {
    return <Redirect to="/" />;
  }

  const attemptSignup = (name, email, password, role) => {
    axios
      .post(`${USER_SIGNUP_ROUTE}`, { name, password, email, role })
      .then(({ data }) => {
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

    if (timeout) {
      clearTimeout(timeout);
    }
    if (Password !== confirmPassword) {
      // throw error
      return dispatch({
        type: "error",
        value:
          "Password confirmation unsuccessful - both entries need to be the same!",
      });
    }
    dispatch({ type: "loading" });
    let role = +Admin;
    await attemptSignup(Name, Email, Password, role);
    dispatch({ type: "loadComplete" });
    timeout = setTimeout(() => {
      dispatch({ type: "clearError" });
    }, 2000);
  };

  const renderForm = () => {
    return (
      <form id="Signup__wrapper__form">
        {[
          ["Name", Name, true],
          ["Email", Email, true],
          ["Password", Password, true],
          ["Confirm password", confirmPassword, true],
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
        <FormControlLabel
          control={
            <Checkbox
              icon={<BuildOutlined />}
              checkedIcon={<Build />}
              onChange={(e) => {
                e.preventDefault();
                dispatch({ type: "admin" });
              }}
            />
          }
          label="Administrative control?"
        />
        <Button variant="contained" color="primary" onClick={submit}>
          Sign up
        </Button>

        {Loading ? <p>FICK</p> : null}
        {RenderError ? <UIMessage message={Error} type="error" /> : null}
        {Success ? <UIMessage message={Success} type="success" /> : null}
      </form>
    );
  };
  return (
    <Layout
      title="Sign up"
      description="Shop with ease and security"
      page="Signup"
    >
      <div id="Signup__wrapper">
        {renderForm()}
        <p id="Signup__wrapper__onboard">
          For the purposes of this project, passwords are encrypted using
          <a href="https://en.wikipedia.org/wiki/Bcrypt"> bcrypt</a>, and email
          adresses are retained to send order confirmations.
          <br /> <br /> By clicking on that wrench, you'll have access to review
          orders, be able to update shipping statuses, and add products and
          categories. <br /> <br />
          Enjoy, and let me know your thoughts!
        </p>
      </div>
    </Layout>
  );
};

export default Signup;
