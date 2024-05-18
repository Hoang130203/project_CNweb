import products from "../ProductData/ProductData";
import { useState } from "react";



const getUniqueFilterValues = () => {
  const filterValues = {
    brand: new Set(),
    rating: new Set(),
  };

  // products.forEach((product) => {
  //   filterValues.brand.add(product.brand);
  //   filterValues.rating.add(product.rating + ' Stars');
  // });
  filterValues.brand.add('Apple');
  filterValues.brand.add('Samsung');
  filterValues.brand.add('Xiaomi');
  filterValues.brand.add('Oppo');
  filterValues.brand.add('Dell');
  filterValues.brand.add('HP');
  filterValues.brand.add('Asus');
  filterValues.rating.add(1 + ' Stars');
  filterValues.rating.add(2 + ' Stars');
  filterValues.rating.add(3 + ' Stars');
  filterValues.rating.add(4 + ' Stars');
  filterValues.rating.add(5 + ' Stars');

  return filterValues;
};

const filterValues = getUniqueFilterValues();
export const filters = [
  {
    nameShow: 'Hãng',
    name: 'brand',
    options: Array.from(filterValues.brand).sort(),
  },
  {
    nameShow: 'Đánh giá',
    name: 'Rating',
    options: Array.from(filterValues.rating).sort(),
  },
];

export const getMinMaxNewPrice = () => {
  // const newPrices = products.map((product) => product.newPrice);
  return {
    min: Math.min(0),
    max: Math.max(100000000)
  };
};