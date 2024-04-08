const products = [
  {
    "image": "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-asus-vivobook-s-14-flip-tp3402va-lz025w-thumbnails.png",
    "name": "Product 1",
    "discount": "Giảm 10%",
    "oldPrice": "12000000",
    "newPrice": "10800000",
    "rating": 4,
    "brand": "Brand A",
    "manufacturingDate": "2022-05-15",
    "salesCount": 1250
  },
  {
    "image": "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-asus-vivobook-s-14-flip-tp3402va-lz025w-thumbnails.png",
    "name": "Product 2",
    "newPrice": "32150000",
    "rating": 3,
    "brand": "Brand B",
    "manufacturingDate": "2023-01-20",
    "salesCount": 765
  },
  {
    "image": "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-asus-vivobook-s-14-flip-tp3402va-lz025w-thumbnails.png",
    "name": "Product 3",
    "discount": "Giảm 15%",
    "oldPrice": "40000000",
    "newPrice": "34000000",
    "rating": 5,
    "brand": "Brand C",
    "manufacturingDate": "2022-11-08",
    "salesCount": 1820
  },
  {
    "image": "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-asus-vivobook-s-14-flip-tp3402va-lz025w-thumbnails.png",
    "name": "Product 4",
    "discount": "Giảm 20%",
    "oldPrice": "75000000",
    "newPrice": "60000000",
    "rating": 4,
    "brand": "Brand A",
    "manufacturingDate": "2023-03-04",
    "salesCount": 2340
  },
  {
    "image": "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-asus-vivobook-s-14-flip-tp3402va-lz025w-thumbnails.png",
    "name": "Product 5",
    "newPrice": "18150000",
    "rating": 3,
    "brand": "Brand B",
    "manufacturingDate": "2022-08-18",
    "salesCount": 1080
  },
  {
    "image": "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-asus-vivobook-s-14-flip-tp3402va-lz025w-thumbnails.png",
    "name": "Product 6",
    "discount": "Giảm 18%",
    "oldPrice": "55000000",
    "newPrice": "45100000",
    "rating": 5,
    "brand": "Brand C",
    "manufacturingDate": "2023-02-27",
    "salesCount": 2005
  },
  {
    "image": "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-asus-vivobook-s-14-flip-tp3402va-lz025w-thumbnails.png",
    "name": "Product 7",
    "discount": "Giảm 12%",
    "oldPrice": "28500000",
    "newPrice": "25080000",
    "rating": 4,
    "brand": "Brand A",
    "manufacturingDate": "2022-09-12",
    "salesCount": 1650
  },
  {
    "image": "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-asus-vivobook-s-14-flip-tp3402va-lz025w-thumbnails.png",
    "name": "Product 8",
    "newPrice": "7150000",
    "rating": 3,
    "brand": "Brand B",
    "manufacturingDate": "2023-04-01",
    "salesCount": 840
  },
  {
    "image": "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-asus-vivobook-s-14-flip-tp3402va-lz025w-thumbnails.png",
    "name": "Product 9",
    "discount": "Giảm 22%",
    "oldPrice": "85000000",
    "newPrice": "66300000",
    "rating": 5,
    "brand": "Brand C",
    "manufacturingDate": "2022-12-15",
    "salesCount": 2400
  },
  {
    "image": "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-asus-vivobook-s-14-flip-tp3402va-lz025w-thumbnails.png",
    "name": "Product 10",
    "discount": "Giảm 16%",
    "oldPrice": "95000000",
    "newPrice": "79800000",
    "rating": 4,
    "brand": "Brand D",
    "manufacturingDate": "2023-01-18",
    "salesCount": 2120
  },
  {
    "image": "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-asus-vivobook-s-14-flip-tp3402va-lz025w-thumbnails.png",
    "name": "Product 1",
    "discount": "Giảm 10%",
    "oldPrice": "12000000",
    "newPrice": "10800000",
    "rating": 4,
    "brand": "Brand A",
    "manufacturingDate": "2022-05-15",
    "salesCount": 1250
  },
  {
    "image": "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-asus-vivobook-s-14-flip-tp3402va-lz025w-thumbnails.png",
    "name": "Product 2",
    "newPrice": "32150000",
    "rating": 3,
    "brand": "Brand B",
    "manufacturingDate": "2023-01-20",
    "salesCount": 765
  },
  {
    "image": "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-asus-vivobook-s-14-flip-tp3402va-lz025w-thumbnails.png",
    "name": "Product 3",
    "discount": "Giảm 15%",
    "oldPrice": "40000000",
    "newPrice": "34000000",
    "rating": 5,
    "brand": "Brand C",
    "manufacturingDate": "2022-11-08",
    "salesCount": 1820
  },
  {
    "image": "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-asus-vivobook-s-14-flip-tp3402va-lz025w-thumbnails.png",
    "name": "Product 4",
    "discount": "Giảm 20%",
    "oldPrice": "75000000",
    "newPrice": "60000000",
    "rating": 4,
    "brand": "Brand A",
    "manufacturingDate": "2023-03-04",
    "salesCount": 2340
  },
  {
    "image": "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-asus-vivobook-s-14-flip-tp3402va-lz025w-thumbnails.png",
    "name": "Product 5",
    "newPrice": "18150000",
    "rating": 3,
    "brand": "Brand B",
    "manufacturingDate": "2022-08-18",
    "salesCount": 1080
  },
  {
    "image": "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-asus-vivobook-s-14-flip-tp3402va-lz025w-thumbnails.png",
    "name": "Product 6",
    "discount": "Giảm 18%",
    "oldPrice": "55000000",
    "newPrice": "45100000",
    "rating": 5,
    "brand": "Brand C",
    "manufacturingDate": "2023-02-27",
    "salesCount": 2005
  },
  {
    "image": "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-asus-vivobook-s-14-flip-tp3402va-lz025w-thumbnails.png",
    "name": "Product 7",
    "discount": "Giảm 12%",
    "oldPrice": "28500000",
    "newPrice": "25080000",
    "rating": 4,
    "brand": "Brand A",
    "manufacturingDate": "2022-09-12",
    "salesCount": 1650
  },
  {
    "image": "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-asus-vivobook-s-14-flip-tp3402va-lz025w-thumbnails.png",
    "name": "Product 8",
    "newPrice": "7150000",
    "rating": 3,
    "brand": "Brand B",
    "manufacturingDate": "2023-04-01",
    "salesCount": 840
  },
  {
    "image": "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-asus-vivobook-s-14-flip-tp3402va-lz025w-thumbnails.png",
    "name": "Product 9",
    "discount": "Giảm 22%",
    "oldPrice": "85000000",
    "newPrice": "66300000",
    "rating": 5,
    "brand": "Brand C",
    "manufacturingDate": "2022-12-15",
    "salesCount": 2400
  },
  {
    "image": "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-asus-vivobook-s-14-flip-tp3402va-lz025w-thumbnails.png",
    "name": "Product 10",
    "discount": "Giảm 16%",
    "oldPrice": "95000000",
    "newPrice": "79800000",
    "rating": 4,
    "brand": "Brand D",
    "manufacturingDate": "2023-01-18",
    "salesCount": 2120
  }
];


export default products;