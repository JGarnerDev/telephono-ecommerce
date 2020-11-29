export const homeInitialState = {
  productsBySales: [],
  productsByDate: [],
  sort: "_id",
  order: "asc",
  limit: 3,
};

export function homeReducer(state, action) {
  switch (action.type) {
    case "productsBySales":
      return { ...state, productsBySales: action.value };
    case "productsByDate":
      return { ...state, productsByDate: action.value };
    case "sort":
      return { ...state, sort: action.value };
    case "order":
      return { ...state, order: action.value };
    case "limit":
      return { ...state, limit: action.value };
    default:
      break;
  }
  return state;
}
