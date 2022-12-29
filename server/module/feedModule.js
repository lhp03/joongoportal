const axios = require("axios");

const getFeedJoongna = async () => {
  const api_url =
    "https://search-api.joongna.com/v25/main/search/cool/product?maxProductNum=50";
  const response = await axios.get(api_url);

  const products = [];

  response.data.data.items.map((item) => {
    products.push({
      from: "JN",
      url: `https://web.joongna.com/product/${item.seq}`,
      img_url: `https://img2.joongna.com${item.url}`,
      title: item.title,
      date: new Date(item.sortDate).getTime(),
      price: item.price,
      state: item.state,
    });
  });
  return products;
};

const getFeedBunjang = async () => {
  const api_url =
    "https://api.bunjang.co.kr/api/rec/v1/products/personalized/main?page=0&size=100";
  const response = await axios.get(api_url);

  const products = [];

  response.data.data.map((item) => {
    if (item.isAd) return true;
    products.push({
      from: "BJ",
      url: `https://m.bunjang.co.kr/${item.pid}`,
      img_url: `${item.productImage}`,
      title: item.productName,
      date: new Date(item.updatedAt).getTime(),
      price: item.price,
      state: item.status,
    });
  });

  return products;
};

const getFeedHelloMarket = async () => {
  const api_url =
    "https://www.hellomarket.com/api/feature/feeds?page=1&limit=50";
  const response = await axios.get(api_url);

  const products = [];

  response.data.data.homeFeedData.list.map((item) => {
    if (item.type === "ad") return true;
    products.push({
      from: "HM",
      url: `https://www.hellomarket.com/item/${item.item.itemIdx}`,
      img_url: item.item.media.imageUrl,
      title: item.item.title,
      date: item.item.timestamp,
      price: item.item.price,
      state: item.item.status,
    });
  });

  return products;
};

module.exports = {
  getFeedBunjang,
  getFeedHelloMarket,
  getFeedJoongna,
};
