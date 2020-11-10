// Client routes
//// User
export const SIGNUP_URL = "/signup";
export const LOGIN_URL = "/login";
export const CLIENT_CART_URL = "/Client/cart";
export const CLIENT_ACCOUNT_URL = "/Client/account";
export const CLIENT_ACCOUNT_UPDATE_URL = "/Client/account/update";
////  Admin
export const ADMIN_ACCOUNT_URL = "/Administrator/account";
export const ADMIN_ACCOUNT_UPDATE_URL = "/Administrator/account/update";
export const ADMIN_MANAGEMENT_URL = "/Administrator/management";

// Server routes
export const API_URL = process.env.REACT_APP_API_ROOT_URL;
export const USER_SIGNUP_ROUTE = API_URL + "/auth/signup";
export const USER_LOGIN_ROUTE = API_URL + "/auth/login";
export const USER_LOGOUT_ROUTE = API_URL + "/auth/logout";
