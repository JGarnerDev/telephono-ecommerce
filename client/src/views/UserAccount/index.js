import React from "react";
import { Link } from "react-router-dom";

import { isAuth } from "../../auth";

import {
  CLIENT_ACCOUNT_UPDATE_URL,
  ADMIN_ACCOUNT_UPDATE_URL,
} from "../../config";

import Layout from "../../hoc/Layout";

import { Details, AdminLinks } from "../../components/Account";

import "./UserAccount.scss";

const UserAccount = () => {
  const {
    user: { role, history, email, name, _id, createdAt },
  } = isAuth();
  let description;
  role ? (description = "Administrator") : (description = "Client");

  return (
    <Layout title={name} description={description} page="Account">
      <Details name={name} email={email} _id={_id} createdAt={createdAt} />
      <section id="Account__options">
        <h3>Need to update your information? </h3>
        <Link to={role ? ADMIN_ACCOUNT_UPDATE_URL : CLIENT_ACCOUNT_UPDATE_URL}>
          Update account
        </Link>
        {role ? <AdminLinks /> : null}
      </section>
    </Layout>
  );
};

export default UserAccount;
