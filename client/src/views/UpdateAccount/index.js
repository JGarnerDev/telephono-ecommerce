import React from "react";
import { Link } from "react-router-dom";

import { isAuth } from "../../auth";

import Layout from "../../hoc/Layout";

const UpdateAccount = () => {
  const {
    user: { role, history, email, name, _id, createdAt },
  } = isAuth();
  let description;
  role
    ? (description = `${name} (Administrator)`)
    : (description = `${name} (Client)`);

  return (
    <Layout title="Update Account Information" description={description}>
      <div className=""></div>
    </Layout>
  );
};

export default UpdateAccount;
