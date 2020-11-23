//////// Price Settings

export const priceRanges = [
  { _id: 0, name: "All", range: [0, 1000000] },
  { _id: 1, name: "$0 to $9", range: [0, 9] },
  { _id: 2, name: "$10 to $19", range: [10, 19] },
  { _id: 3, name: "$20 to $29", range: [20, 29] },
  { _id: 4, name: "$30 to $39", range: [30, 39] },
  { _id: 5, name: "$40+", range: [40, 1000000] },
];

//////// Navigation and Routes

//// Open routes
export const SHOP_URL = "/shop";
export const PRODUCT_URL = "/product/:productId";

// Auth
export const SIGNUP_URL = "/signup";
export const LOGIN_URL = "/login";

//// Client routes
export const CLIENT_CART_URL = "/Client/cart";
export const CLIENT_ACCOUNT_URL = "/Client/account";
export const CLIENT_ACCOUNT_UPDATE_URL = "/Client/account/update";

////  Admin

// Account
export const ADMIN_ACCOUNT_URL = "/Administrator/account";
export const ADMIN_ACCOUNT_UPDATE_URL = "/Administrator/account/update";

// Product Management
export const ADMIN_PRODUCT_MANAGEMENT_URL = "/Administrator/products";
export const ADMIN_ADD_PRODUCT_URL = "/Administrator/products/add";
export const ADMIN_UPDATE_PRODUCT_URL = "/Administrator/products/update";
export const ADMIN_DELETE_PRODUCT_URL = "/Administrator/products/delete";

// Product Category Management
export const ADMIN_CATEGORY_MANAGEMENT_URL = "/Administrator/categories";
export const ADMIN_ADD_CATEGORY_URL = "/Administrator/categories/add";

// Product Category Management
export const ADMIN_VIEW_ORDERS_URL = "/Administrator/orders";

//// Server routes
export const API_URL = process.env.REACT_APP_API_ROOT_URL;

// Auth
export const USER_SIGNUP_ROUTE = API_URL + "/auth/signup";
export const USER_LOGIN_ROUTE = API_URL + "/auth/login";
export const USER_LOGOUT_ROUTE = API_URL + "/auth/logout";

// Product Categories
export const GET_CATEGORIES_ROUTE = API_URL + "/categories";
export const ADD_CATEGORY_ROUTE = API_URL + "/categories/new";

// Products
export const GET_PRODUCTS_ROUTE = API_URL + "/products";
export const RELATED_PRODUCTS_ROUTE = API_URL + "/products/related";

export const SEARCH_PRODUCTS_ROUTE = API_URL + "/products/search";
export const FILTER_PRODUCTS_ROUTE = API_URL + "/products/filter";

export const ADD_PRODUCT_ROUTE = API_URL + "/products/new";

// Purchasing

export const GET_PURCHASE_TOKEN_ROUTE = API_URL + "/checkout/paymenttoken";
export const PROCESS_PURCHASE_ROUTE = API_URL + "/checkout";
export const SAVE_ORDER_DATA_ROUTE = API_URL + "/orders/create";
export const GET_ORDERS_ROUTE = API_URL + "/orders";
export const GET_SHIPPING_STATUS_VALUES_ROUTE =
  API_URL + "/orders/shipmentvalues";
export const UPDATE_SHIPPING_STATUS_ROUTE = API_URL + "/orders/updatestatus";
