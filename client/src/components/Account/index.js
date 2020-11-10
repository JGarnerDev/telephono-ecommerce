import { Link } from "react-router-dom";

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

export const AdminLinks = ({}) => {
  return (
    <div>
      <Link to="">Add a product category</Link>
      <Link>Add a product </Link>
    </div>
  );
};
