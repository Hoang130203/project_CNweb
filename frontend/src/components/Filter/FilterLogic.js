import products from "../ProductData/ProductData";
import { useState } from "react";



const getUniqueFilterValues = () => {
  const filterValues = {
    brand: new Set(),
    rate: new Set(),
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
  filterValues.rate.add(1 + ' sao');
  filterValues.rate.add(2 + ' sao');
  filterValues.rate.add(3 + ' sao');
  filterValues.rate.add(4 + ' sao');
  filterValues.rate.add(5 + ' sao');

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
    name: 'rate',
    options: Array.from(filterValues.rate).sort(),
  },
];

export const getMinMaxNewPrice = () => {
  // const newPrices = products.map((product) => product.newPrice);
  return {
    min: Math.min(0),
    max: Math.max(100000000)
  };
};