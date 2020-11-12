import { Link } from "react-router-dom";

import {
  ADMIN_CATEGORY_MANAGEMENT_URL,
  ADMIN_PRODUCT_MANAGEMENT_URL,
} from "../../config";

export const Details = ({ name, email, _id, createdAt }) => {
  return (
    <div>
      <h3>Account Details</h3>
      <ul>
        <li>Name: {name}</li>
        <li>Email: {email}</li>
        <li>Account ID: {_id}</li>
        <li>Account created at: {createdAt}</li>
      </ul>
    </div>
  );
};

export const History = ({}) => {
  return (
    <div>
      <h3>Purchase History</h3>
      <ul>
        <li>Name: {}</li>
      </ul>
    </div>
  );
};

export const AdminLinks = () => {
  return (
    <div>
      <Link to={ADMIN_CATEGORY_MANAGEMENT_URL}>Update product categories</Link>
      <Link to={ADMIN_PRODUCT_MANAGEMENT_URL}>Update products </Link>
    </div>
  );
};
