import React from "react";

import TextField from "@material-ui/core/TextField";

const FormField = ({ label, value, changeHandler, required }) => {
  let type;
  if (label.toLowerCase().indexOf("password") !== -1) {
    type = "password";
  } else if (label === "email") {
    type = "email";
  } else if (label === "price" || label === "quantity") {
    type = "number";
  } else {
    type = "text";
  }
  return (
    <TextField
      type={type}
      label={label}
      value={value}
      required={required}
      onChange={changeHandler}
    />
  );
};

export default FormField;
