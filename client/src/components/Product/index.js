import React, { useState } from "react";
import { Link } from "react-router-dom";

import { GET_PRODUCTS_ROUTE } from "../../config";
import {
  addProduct,
  removeProduct,
  updateProductQuantity,
} from "../../views/Cart/utils";

import "./Product.scss";

export const ProductImage = ({ _id, isPreview, image }) => {
  return isPreview ? (
    <img src={image} className="productCard__image"></img>
  ) : (
    <object
      data={GET_PRODUCTS_ROUTE + `/${_id}/img`}
      type="image/png"
      className="productCard__image"
    >
      <img
        src={
          image ||
          "https://www.och-lco.ca/wp-content/uploads/2015/07/unavailable-image.jpg"
        }
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

  const handleChange = (productId, maxQuantity) => (event) => {
    setUpdate(!update);

    const setAcceptableQuantity = (value) => {
      if (value < 1) {
        value = 1;
      } else if (value >= maxQuantity) {
        value = maxQuantity;
      }
      console.log(value);
      setQuantity(value);
      updateProductQuantity(productId, value);
    };

    setAcceptableQuantity(event.target.value);
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

  const renderInCartOptions = ({ _id, maxQuantity }) => {
    return (
      <>
        <p>Units available: {maxQuantity}</p>
        <input
          type="number"
          value={quantity}
          onChange={handleChange(_id, maxQuantity)}
        />
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
