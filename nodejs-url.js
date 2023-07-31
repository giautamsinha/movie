import url from 'url'
const address =
  "http://ww.eduonix.com:8000/products/product.html?id=23&name=cheeze";

  const myURL = url.parse(address ,true)

  console.log("myURL" ,myURL)