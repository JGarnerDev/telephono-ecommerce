export const shopInitialState = {
  products: [],
  listLength: 0,
  availableCategories: [],
  activeCategories: [],
  priceRange: [],
  skip: 0,
  limit: 6,
};

export function shopReducer(state, action) {
  switch (action.type) {
    case "setAvailableCategories":
      return { ...state, availableCategories: action.value };
    case "addActiveCategory":
      const categories = state.activeCategories;
      categories.push(action.value);
      return { ...state, activeCategories: categories };
    case "removeActiveCategory":
      const filteredCategories = state.activeCategories.filter(
        (activeCategory) => activeCategory !== action.value
      );
      return { ...state, activeCategories: filteredCategories };
    case "setPriceRange":
      return { ...state, priceRange: action.value };
    case "setQuerySkip":
      return { ...state, skip: action.value };
    case "setQueryLimit":
      return { ...state, limit: action.value };
    case "setProducts":
      return { ...state, products: action.value };
    case "loadMoreProducts":
      return { ...state, products: [...state.products, ...action.value] };
    case "setListLength":
      return { ...state, listLength: action.value };

    default:
      break;
  }

  return state;
}
