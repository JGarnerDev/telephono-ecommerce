const isNameValid = (name) => {
  if (!name || typeof name !== "string") {
    return false;
  }
  return true;
};

module.exports = { isNameValid };
