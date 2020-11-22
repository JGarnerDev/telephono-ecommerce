import React, { useState } from "react";
import { Link } from "react-router-dom";

import { GET_PRODUCTS_ROUTE } from "../../config";
import {
  addProduct,
  removeProduct,
  updateProductQuantity,
} from "../../views/Cart/utils";

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

export const ProductCard = ({
  product,
  inCart,
  setUpdate = (f) => f,
  update = undefined,
}) => {
  const [quantity, setQuantity] = useState(product.quantity);

  const addProductToCart = () => {
    addProduct(product);
  };

  const removeProductFromCart = (_id) => {
    removeProduct(_id);
  };

  const handleChange = (productId) => (event) => {
    setUpdate(!update);
    setQuantity(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateProductQuantity(productId, event.target.value);
    }
  };

  const renderBasicProductInfo = ({ name, price, description, _id }) => {
    return (
      <>
        <h3>{name}</h3>
        <ProductImage _id={_id} name={name} />
        <p>{description}</p>
        <p>${price}</p>
        <Link to={`/product/${_id}`}>View</Link>
      </>
    );
  };

  const renderInCartOptions = ({ _id }) => {
    return (
      <>
        <input type="number" value={quantity} onChange={handleChange(_id)} />
        <button
          onClick={() => {
            removeProductFromCart(_id);
            setUpdate(!update);
          }}
        >
          Remove from cart
        </button>
      </>
    );
  };

  const renderInShopOptions = () => {
    return <button onClick={addProductToCart}>Add to cart</button>;
  };

  return inCart ? (
    <div className="productCard">
      {renderBasicProductInfo(product)}
      {renderInCartOptions(product)}
    </div>
  ) : (
    <div className="productCard">
      {renderBasicProductInfo(product)}
      {renderInShopOptions(product)}
    </div>
  );
};
