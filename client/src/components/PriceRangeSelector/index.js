import React, { useState } from "react";

const PriceRangeSelector = ({ priceRanges, handleChange }) => {
  const [activePriceRange, setActivePriceRange] = useState(0);

  return (
    <>
      <h2>Price Ranges</h2>
      <ul>
        {priceRanges.map((priceRange, i) => {
          return (
            <li key={i}>
              <label>{priceRange.name}</label>
              <input
                type="checkbox"
                value={`${priceRange._id}`}
                onChange={(event) => {
                  setActivePriceRange(event.target.value);
                  handleChange(event.target.value);
                }}
                checked={priceRange._id == activePriceRange}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default PriceRangeSelector;
