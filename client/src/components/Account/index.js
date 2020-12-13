import { Link } from "react-router-dom";

import { CLIENT_ORDER_HISTORY_URL } from "../../config";

export const Details = ({ name, email, _id, createdAt }) => {
  return (
    <section id="Account__details">
      <h3>Account Details</h3>
      <ul>
        <li>Name: {name}</li>
        <li>Email: {email}</li>
        <li>Account ID: {_id}</li>
        <li>Account created at: {createdAt}</li>
        <Link to={CLIENT_ORDER_HISTORY_URL}>View my order history</Link>
      </ul>
    </section>
  );
};
