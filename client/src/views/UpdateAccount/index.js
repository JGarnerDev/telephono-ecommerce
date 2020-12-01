import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { isAuth, updateUserJWT } from "../../auth";

import { UPDATE_USER_ACCOUNT_ROUTE } from "../../config";

import Layout from "../../hoc/Layout";
import FormField from "../../components/FormField";

import { FormControlLabel, Checkbox, Button } from "@material-ui/core";
import { Build, BuildOutlined } from "@material-ui/icons";

import "./UpdateAccount.scss";

const UpdateAccount = () => {
  const [userProfile, setUserProfile] = useState(isAuth().user);
  const [token, setToken] = useState(isAuth().token);

  const submit = (e) => {
    e.preventDefault();
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(
        UPDATE_USER_ACCOUNT_ROUTE + "/" + userProfile._id,
        { userProfile },
        config
      )
      .then((res) => {
        updateUserJWT(res.data);
      });
  };

  const { name, email, password, role, _id } = userProfile;

  const handleInfoChange = (event, key) => {
    event.preventDefault();
    if (key === "role") {
      if (role) {
        return setUserProfile({ ...userProfile, role: 0 });
      }
      return setUserProfile({ ...userProfile, role: 1 });
    }
    setUserProfile({ ...userProfile, [key]: event.target.value });
  };

  const formFieldOptions = [{ name }, { email }, { password }];

  const renderFormFieldOptions = () =>
    formFieldOptions.map((formValue, i) => (
      <FormField
        label={Object.keys(formFieldOptions[i])[0]}
        value={userProfile[formValue]}
        changeHandler={(event) =>
          handleInfoChange(event, Object.keys(formFieldOptions[i])[0])
        }
      />
    ));

  const renderAdminToggle = () => (
    <FormControlLabel
      control={
        <Checkbox
          icon={<BuildOutlined />}
          checkedIcon={<Build />}
          onChange={(event) => {
            event.preventDefault();
            handleInfoChange(event, "role");
          }}
          value={role}
          checked={!!role}
        />
      }
      label="Administrative? "
    />
  );

  const renderUserUpdateForm = () => (
    <form id="UpdateAccount__wrapper__form">
      {renderFormFieldOptions()}
      {renderAdminToggle()}
      <Button
        onClick={(e) => {
          submit(e);
        }}
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
    </form>
  );

  let description;
  role
    ? (description = `${name} (Administrator)`)
    : (description = `${name} (Client)`);

  return (
    <Layout
      title="Update Account Information"
      description={description}
      page="UpdateAccount"
    >
      <div id="UpdateAccount__wrapper">
        {userProfile && renderUserUpdateForm()}
      </div>
    </Layout>
  );
};

export default UpdateAccount;
