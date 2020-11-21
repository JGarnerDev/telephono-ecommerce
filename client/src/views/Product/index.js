import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { GET_PRODUCTS_ROUTE, RELATED_PRODUCTS_ROUTE } from "../../config";

import { ProductImage, ProductCard } from "../../components/Product";
import Layout from "../../hoc/Layout";

const Product = () => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(false);

  const productId = useParams().productId;

  const init = (productId) => {
    axios.get(GET_PRODUCTS_ROUTE + `/${productId}`).then((res) => {
      setProduct(res.data[0]);
    });

    axios.get(RELATED_PRODUCTS_ROUTE + `/${productId}`).then((res) => {
      setRelatedProducts(res.data);
    });
  };

  useEffect(() => {
    init(productId);
  }, []);

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
        <div>
          <h2>{name}</h2>
          <h3>Details</h3>
          <p>{description}</p>
          <h3>${price}</h3>
          <h3>Units available: {quantity}</h3>
          <h3>{shipping ? "Shipping available" : "Shipping unavailable"}</h3>

          <>Product id: {_id}</>
        </div>
      );
    }
  };

  const renderRelatedProducts = () => {
    return relatedProducts[0] ? (
      <div>
        <h2>Related Products</h2>
        {relatedProducts.map((product, i) => {
          return <ProductCard product={product} key={i} />;
        })}
      </div>
    ) : null;
  };

  return (
    <Layout title={product.name || "Couldn't find product"}>
      <ProductImage _id={productId} />
      {renderProductDetails(product)}

      {renderRelatedProducts()}
    </Layout>
  );
};

export default Product;
