import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";

import { GET_CATEGORIES_ROUTE, SEARCH_PRODUCTS_ROUTE } from "../../config";

import { ProductCard } from "../../components/Product";

import { Search as SearchIcon } from "@material-ui/icons";

import "./Search.scss";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    searchString: "",
    searched: false,
    products: [],
  });

  const init = () => {
    axios.get(GET_CATEGORIES_ROUTE).then((res) => {
      setData({ ...data, categories: res.data });
    });
  };

  useEffect(() => {
    init();
  }, []);

  const { categories, category, searchString, searched, products } = data;

  const searchForProducts = () => {
    const searchCriteria = {
      search: searchString || " ",
      category: category || "All",
    };

    const query = queryString.stringify(searchCriteria);
    console.log(query);
    axios.get(SEARCH_PRODUCTS_ROUTE + `?${query}`, {}).then((res) => {
      setData({ ...data, products: res.data });
    });
  };

  const submit = (event) => {
    event.preventDefault();
    searchForProducts();
  };

  const handleChange = (key) => (event) => {
    setData({ ...data, searched: false, [key]: event.target.value });
  };

  const renderSearchForm = () => {
    return (
      <form onSubmit={submit}>
        <select onChange={handleChange("category")}>
          <option value="All">Categories</option>
          {categories.map((categoryOption, i) => {
            return (
              <option value={categoryOption._id} key={i}>
                {categoryOption.name}
              </option>
            );
          })}
        </select>
        <input
          type="search"
          onChange={handleChange("searchString")}
          placeholder="Search our models"
        />
        <button>
          <SearchIcon />
        </button>
      </form>
    );
  };

  const renderProducts = () => {
    return products.length ? (
      <div className={products.length ? "display" : ""}>
        <h3>Here's what we found</h3>
        {products.map((product, i) => {
          return <ProductCard product={product} key={i} />;
        })}
      </div>
    ) : null;
  };

  return (
    <section id="Search">
      {renderSearchForm()}
      {renderProducts()}
    </section>
  );
};

export default Search;
