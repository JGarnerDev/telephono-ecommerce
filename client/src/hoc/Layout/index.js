import React from "react";

import Nav from "../../components/Nav";

import "./Layout.scss";

const Layout = ({
  title = "View",
  description = "A page of this website",
  children,
}) => {
  return (
    <React.Fragment>
      <Nav />
      <div id="page-banner">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <React.Fragment>{children}</React.Fragment>
    </React.Fragment>
  );
};

export default Layout;
