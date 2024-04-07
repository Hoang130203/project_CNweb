import products from "../ProductData/ProductData";
import { useState } from "react";



const getUniqueFilterValues = () => {
    const filterValues = {
      brand: new Set(),
      rating: new Set(),
    };
  
    products.forEach((product) => {
      filterValues.brand.add(product.brand);
      filterValues.rating.add(product.rating + ' Stars');
    });
  
    return filterValues;
  };

  const filterValues = getUniqueFilterValues();
export const filters = [
    {
        name: 'Brand',
        options: Array.from(filterValues.brand).sort(),
    },
    {
        name: 'Rating',
        options: Array.from(filterValues.rating).sort(),
    },
];

export const getMinMaxNewPrice = () => {
    const newPrices = products.map((product) => product.newPrice);
    return {
      min: Math.min(...newPrices),
      max: Math.max(...newPrices)
    };
  };