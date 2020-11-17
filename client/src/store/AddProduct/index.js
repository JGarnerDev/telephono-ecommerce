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
  error: "",
  renderError: "",
  loading: false,
  success: false,
};

export function addProductReducer(state, action) {
  switch (action.type) {
    case "fieldChange":
      return {
        ...state,
        product: { ...state.product, [action.field]: action.value },
      };

    case "categories":
      return { ...state, categories: action.value };

    case "error":
      return { ...state, renderError: true, error: action.value };
    case "clearError":
      return { ...state, renderError: false, error: "" };
    case "loading":
      return { ...state, loading: true };
    case "loadComplete":
      return { ...state, loading: false };
    case "success":
      return { ...state, success: action.value };

    default:
      break;
  }
  return state;
}
