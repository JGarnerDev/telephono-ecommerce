export const addCategoryInitialState = {
  Name: "",
};

export function addCategoryReducer(state, action) {
  switch (action.type) {
    case "fieldChange":
      return { ...state, [action.field]: action.value };

    default:
      break;
  }
  return state;
}
