export const addProductInitialState = {
  product: {
    name: "",

    category: "",

    description: "",
    price: 0,
    quantity: 0,
    shipping: 1,
    img: "",
  },
  categories: [],
  Error: "",
  RenderError: "",
  Loading: false,
  Success: false,
};

export function addProductReducer(state, action) {
  switch (action.type) {
    case "fieldChange":
      return {
        ...state,
        product: { ...state.product, [action.field]: action.value },
      };
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

    default:
      break;
  }
  return state;
}
