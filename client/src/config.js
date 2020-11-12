//// Client routes
// Auth
export const SIGNUP_URL = "/signup";
export const LOGIN_URL = "/login";
// Client
export const CLIENT_CART_URL = "/Client/cart";
export const CLIENT_ACCOUNT_URL = "/Client/account";
export const CLIENT_ACCOUNT_UPDATE_URL = "/Client/account/update";

////  Admin
// Account
export const ADMIN_ACCOUNT_URL = "/Administrator/account";
export const ADMIN_ACCOUNT_UPDATE_URL = "/Administrator/account/update";
// Product Management
export const ADMIN_PRODUCT_MANAGEMENT_URL = "/Administrator/products/";
export const ADMIN_ADD_PRODUCT_URL = "/Administrator/products/add";
export const ADMIN_UPDATE_PRODUCT_URL = "/Administrator/products/update";
export const ADMIN_DELETE_PRODUCT_URL = "/Administrator/products/delete";

// Product Category Management
export const ADMIN_CATEGORY_MANAGEMENT_URL = "/Administrator/categories/";
export const ADMIN_ADD_CATEGORY_URL = "/Administrator/categories/add";
export const ADMIN_UPDATE_CATEGORY_URL = "/Administrator/categories/update";
export const ADMIN_DELETE_CATEGORY_URL = "/Administrator/categories/delete";

//// Server routes
export const API_URL = process.env.REACT_APP_API_ROOT_URL;
// Auth
export const USER_SIGNUP_ROUTE = API_URL + "/auth/signup";
export const USER_LOGIN_ROUTE = API_URL + "/auth/login";
export const USER_LOGOUT_ROUTE = API_URL + "/auth/logout";
// Product Categories
export const ADD_CATEGORY_ROUTE = API_URL + "/categories/new";
