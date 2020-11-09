export const signupInitialState = {
  Name: "",
  Email: "",
  Password: "",
  "Confirm password": "",
  Error: "",
  RenderError: false,
  Loading: false,
  Success: false,
};

export function signupReducer(state, action) {
  switch (action.type) {
    case "fieldChange":
      return { ...state, [action.field]: action.value };
    case "error":
      return { ...state, RenderError: true, Error: action.value };
    case "clearError":
      return { ...state, RenderError: false, Error: "" };
    case "loading":
      return { ...state, Loading: true };
    case "loadComplete":
      return { ...state, Loading: false };
    case "success":
      return { ...state, Success: true };
    case "redirect":
      return { ...state, Redirect: true };
    default:
      break;
  }
  return state;
}
