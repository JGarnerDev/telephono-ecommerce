import React from "react";

const CategorySelector = ({ availableCategories, handleChange }) => {
  return (
    <>
      <h2>Product Categories </h2>
      <ul>
        {availableCategories.map((availableCategory, i) => {
          return (
            <li key={i}>
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
