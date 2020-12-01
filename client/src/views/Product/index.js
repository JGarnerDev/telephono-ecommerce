import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

import { GET_PRODUCTS_ROUTE, RELATED_PRODUCTS_ROUTE } from "../../config";

import { ProductImage, ProductCard } from "../../components/Product";
import Layout from "../../hoc/Layout";

import "./Product.scss";

const Product = () => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(false);

  let { productId } = useParams();

  const init = (productId) => {
    window.scrollTo(0, 0);
    axios.get(GET_PRODUCTS_ROUTE + `/${productId}`).then((res) => {
      setProduct(res.data[0]);
    });

    axios.get(RELATED_PRODUCTS_ROUTE + `/${productId}`).then((res) => {
      setRelatedProducts(res.data);
    });
  };

  useEffect(() => {
    init(productId);
  }, [productId]);

  const renderProductDetails = ({
    description,
    name,
    price,
    quantity,
    shipping,
    _id,
  }) => {
    if (product.name) {
      return (
        <div id="product-display">
          <ProductImage _id={productId} />
          <div id="product-details">
            <h2>{name}</h2>
            <p>{description}</p>
            <h2 id="price">${price}</h2>
            <div id="reference">
              <h3>Units available: {quantity}</h3>
              <h3>
                {shipping ? "Shipping available" : "Shipping unavailable"}
              </h3>
              <h3>Product id: {_id}</h3>
            </div>
          </div>
        </div>
      );
    }
  };

  const renderRelatedProducts = () => {
    return relatedProducts[0] ? (
      <div id="related-products">
        <h2>Related Products</h2>
        <div id="products">
          {relatedProducts.map((product, i) => {
            return <ProductCard product={product} key={i} />;
          })}
        </div>
      </div>
    ) : null;
  };

  return (
    <Layout
      title={product.name || "Couldn't find product"}
      description="Product details"
      page="Product"
    >
      <div className="content-wrapper">
        {renderProductDetails(product)}

        {renderRelatedProducts()}
      </div>
    </Layout>
  );
};

export default Product;
