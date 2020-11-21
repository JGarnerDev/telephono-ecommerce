import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";

import { GET_CATEGORIES_ROUTE, SEARCH_PRODUCTS_ROUTE } from "../../config";

import { ProductCard } from "../../components/Product";

import { Search as SearchIcon } from "@material-ui/icons";

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
    const searchCriteria = { search: searchString || undefined, category };

    const query = queryString.stringify(searchCriteria);

    axios.get(SEARCH_PRODUCTS_ROUTE + `?${query}`, {}).then((res) => {
      setData({ ...data, products: res.data });
    });
    console.log(products);
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
          <option value="Any">Any category</option>
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
          placeholder="Looking for soemthing?"
        />
        <button>
          <SearchIcon />
        </button>
      </form>
    );
  };

  const renderProducts = () => {
    return products ? (
      <div>
        {products.map((product, i) => {
          return <ProductCard product={product} key={i} />;
        })}
      </div>
    ) : (
      <p>No results</p>
    );
  };

  return (
    <div>
      {renderSearchForm()}
      {renderProducts()}
    </div>
  );
};

export default Search;
