import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

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
    <div className="img-wrapper">
      <LazyLoadImage
        className="productCard__image"
        src={
          GET_PRODUCTS_ROUTE + `/${_id}/img` ||
          "https://www.och-lco.ca/wp-content/uploads/2015/07/unavailable-image.jpg"
        }
        effect="blur"
      />
    </div>
  );
};

export const ProductCard = ({
  product,
  inCart,
  setUpdate = (f) => f,
  update = undefined,
  modifierClass = "",
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

      setQuantity(value);
      updateProductQuantity(productId, value);
    };

    setAcceptableQuantity(event.target.value);
  };

  const renderBasicProductInfo = ({ name, price, description, _id }) => {
    if (description.length > 75) {
      description = description.slice(0, 75) + "...";
    }
    return (
      <>
        <ProductImage _id={_id} name={name} />
        <div className="productCard__info">
          <h3>{name}</h3>
          <p>{description}</p>
          <p>${price}</p>
        </div>
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

  const renderInShopOptions = (_id) => {
    return (
      <div className="productCard__buttons">
        <Link to={`/product/${_id}`}>View</Link>
        <button onClick={addProductToCart}>Add to cart</button>
      </div>
    );
  };

  return inCart ? (
    <div className={"productCard " + " productCard" + modifierClass}>
      {renderBasicProductInfo(product)}
      {renderInCartOptions(product)}
    </div>
  ) : (
    <div className={"productCard " + "productCard" + modifierClass}>
      {renderBasicProductInfo(product)}
      {renderInShopOptions(product._id)}
    </div>
  );
};
