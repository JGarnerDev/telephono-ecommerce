import { Description } from "@material-ui/icons";
import React from "react";

import { GET_PRODUCTS_ROUTE } from "../../config";

import "./Product.scss";

export const ProductImage = ({ _id, name }) => {
  return (
    <img
      className="productCard__image"
      src={GET_PRODUCTS_ROUTE + `/${_id}/img`}
      alt={name}
    />
  );
};

export const ProductCard = ({ product: { name, price, description, _id } }) => {
  return (
    <div className="productCard">
      <h3>{name}</h3>
      <ProductImage _id={_id} name={name} />
      <p>{description}</p>
      <p>${price}</p>
    </div>
  );
};
