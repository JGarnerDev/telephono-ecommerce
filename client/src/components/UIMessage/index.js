import React from "react";

const UIMessage = ({ message, type }) => {
  return <label className={`UIMessage ${type}`}>{message}</label>;
};

export default UIMessage;
