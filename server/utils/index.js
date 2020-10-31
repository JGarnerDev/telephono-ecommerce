// From user_model:
// name: { type: String, trim: true, required: true, maxlength: 32 }

const isStringValid = (string) => {
  if (!string || typeof string !== "string" || string.length > 32) {
    return false;
  }
  return true;
};

// From user_model:
//  email: { type: String, trim: true, required: true, unique: true, maxlength: 32}

const isEmailValid = (email) => {
  const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!pattern.test(String(email).toLowerCase()) || email.length > 32) {
    return false;
  }
  return true;
};

module.exports = { isStringValid, isEmailValid };
