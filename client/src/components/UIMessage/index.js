import React from "react";

import { ErrorOutline } from "@material-ui/icons";

import "./UIMessage.scss";

const UIMessage = ({ message, type }) => {
  return (
    <label className={`UIMessage ${type}`}>
      {type === "error" ? <ErrorOutline /> : null}
      <p>{message}</p>{" "}
    </label>
  );
};

export default UIMessage;
