import React from "react";

const CategorySelector = ({ availableCategories, handleChange }) => {
  return (
    <>
      <ul className="categories">
        <h2>Category </h2>
        {availableCategories.map((availableCategory, i) => {
          return (
            <li className="categories__option" key={i}>
              <label>{availableCategory.name}</label>
              <input
                type="checkbox"
                onChange={() => handleChange(availableCategory._id)}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CategorySelector;
