import React from "react";

import Nav from "../../components/Nav";

import "./Layout.scss";

const Layout = ({
  title = "View",
  page = "This page doesn't have an id selector!",
  description = "A page of this website",
  children,
}) => {
  return (
    <div id={page} className="page">
      <section id={page + "__banner"} className="banner">
        <h1>{title}</h1>
        <h2>{description}</h2>
      </section>
      <React.Fragment>{children}</React.Fragment>
    </div>
  );
};

export default Layout;
