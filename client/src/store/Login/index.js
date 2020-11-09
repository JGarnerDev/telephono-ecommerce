export const loginInitialState = {
  Email: "",
  Password: "",
  Error: "",
  RenderError: false,
  Loading: false,
  Success: false,
};

export function loginReducer(state, action) {
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
