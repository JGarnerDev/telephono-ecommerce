import React, { useReducer, useEffect } from "react";
import axios from "axios";

import { shopReducer, shopInitialState } from "../../store/Shop";

import {
  priceRanges,
  FILTER_PRODUCTS_ROUTE,
  GET_CATEGORIES_ROUTE,
} from "../../config";

import Layout from "../../hoc/Layout";
import CategorySelector from "../../components/CategorySelector";
import PriceRangeSelector from "../../components/PriceRangeSelector";
import { ProductCard } from "../../components/Product";

import "./Shop.scss";

const Shop = () => {
  const [state, dispatch] = useReducer(shopReducer, shopInitialState);
  const {
    availableCategories,
    activeCategories,
    priceRange,
    skip,
    limit,
    products,
    listLength,
  } = state;

  const init = () => {
    axios.get(GET_CATEGORIES_ROUTE).then((res) => {
      dispatch({ type: "setAvailableCategories", value: res.data });
    });
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    filterProductsBySelection();
    dispatch({ type: "setQuerySkip", value: 0 });
  }, [JSON.stringify(activeCategories), priceRange]);

  const handleCategoryToggle = (_id) => {
    const activeCategoryIndex = activeCategories.indexOf(_id);
    activeCategoryIndex === -1
      ? dispatch({ type: "addActiveCategory", value: _id })
      : dispatch({ type: "removeActiveCategory", value: _id });
  };

  const handlePriceRangeToggle = (priceRangeId) => {
    const selectedPriceRange = priceRanges.filter(
      (range) => range._id == priceRangeId
    );
    dispatch({ type: "setPriceRange", value: selectedPriceRange[0].range });
  };

  const filterProductsBySelection = () => {
    const category = activeCategories;
    const price = priceRange;
    const filters = { category, price };
    axios.post(FILTER_PRODUCTS_ROUTE, { skip, limit, filters }).then((res) => {
      dispatch({ type: "setProducts", value: res.data.products });
      dispatch({ type: "setListLength", value: res.data.listLength });
    });
  };

  const loadMore = () => {
    const category = activeCategories;
    const price = priceRange;
    const filters = { category, price };
    dispatch({ type: "setQuerySkip", value: skip + limit });
    axios.post(FILTER_PRODUCTS_ROUTE, { skip, limit, filters }).then((res) => {
      dispatch({
        type: "loadMoreProducts",
        value: res.data.products,
      });
    });
  };

  const renderLoadMoreButton = () => {
    if (listLength - 6 - skip > 0) {
      return <button onClick={() => loadMore()}>Load more</button>;
    }
  };

  const renderProducts = () => {
    return (
      <section id="Shop__products">
        {products.map((product, i) => {
          return <ProductCard product={product} key={i} />;
        })}
      </section>
    );
  };

  return (
    <Layout
      title="Shop"
      description="Find something right for you!"
      page="Shop"
    >
      <div id="content-wrapper">
        <section id="Shop__filter">
          <CategorySelector
            availableCategories={availableCategories}
            handleChange={handleCategoryToggle}
          />
          <PriceRangeSelector
            priceRanges={priceRanges}
            handleChange={handlePriceRangeToggle}
          />
        </section>

        {renderProducts()}
        {renderLoadMoreButton()}
      </div>
    </Layout>
  );
};

export default Shop;
