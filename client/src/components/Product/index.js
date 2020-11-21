import { Description } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

import { GET_PRODUCTS_ROUTE } from "../../config";

import "./Product.scss";

export const ProductImage = ({ _id }) => {
  return (
    <object
      data={GET_PRODUCTS_ROUTE + `/${_id}/img`}
      type="image/png"
      className="productCard__image"
    >
      <img
        src="https://www.och-lco.ca/wp-content/uploads/2015/07/unavailable-image.jpg"
        alt="Image not available"
        className="productCard__image"
      ></img>
    </object>
  );
};

export const ProductCard = ({ product: { name, price, description, _id } }) => {
  return (
    <div className="productCard">
      <h3>{name}</h3>
      <ProductImage _id={_id} name={name} />
      <p>{description}</p>
      <p>${price}</p>
      <Link to={`/product/${_id}`}>View</Link>
    </div>
  );
};
