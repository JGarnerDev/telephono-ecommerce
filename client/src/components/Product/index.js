import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { Button } from "@material-ui/core";

import { GET_PRODUCTS_ROUTE } from "../../config";
import {
  addProduct,
  removeProduct,
  updateProductQuantity,
} from "../../views/Cart/utils";

import "./Product.scss";

export const ProductImage = ({ _id, isPreview, image }) => {
  return isPreview ? (
    <img
      src={image}
      className="productCard__image"
      id="ProductEditor__wrapper__imgPreview"
    ></img>
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
  showcase,
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
      <div className="product-details">
        <ProductImage _id={_id} name={name} />
        <div className="productCard__info">
          <h3>{name}</h3>
          <p>{description}</p>
          <p>${price}</p>
        </div>
      </div>
    );
  };

  const renderInCartOptions = ({ _id, maxQuantity }) => {
    return (
      <div className="product-cartOptions">
        <p className="units-available"> {maxQuantity} available</p>
        <input
          className="quantity-adjuster"
          type="number"
          value={quantity}
          onChange={handleChange(_id, maxQuantity)}
        />
        <Button
          onClick={() => {
            removeProductFromCart(_id);
            setUpdate(!update);
          }}
          variant="contained"
          color="secondary"
        >
          Remove
        </Button>
      </div>
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
    <div className="productCard cart">
      {renderBasicProductInfo(product)}
      {renderInCartOptions(product)}
    </div>
  ) : (
    <div className="productCard" id={showcase && "showcase"}>
      {renderBasicProductInfo(product)}
      {renderInShopOptions(product._id)}
    </div>
  );
};
