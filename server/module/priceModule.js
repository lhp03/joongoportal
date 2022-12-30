const axios = require("axios");

const getPrice = async (keyword, page = 5) => {
  keyword = encodeURI(keyword);
  const api_url = `https://apis.naver.com/cafe-web/cafe-search-api/v4.0/trade-search/all?query=${keyword}&page=${page}&size=100&recommendKeyword=true&searchOrderParamType=DEFAULT&transactionStatuses=COMPLETED`;

  let now = 1;
  totalPrice = 0;
  let num = 0;

  while (now <= page) {
    now++;
    const response = await axios.get(api_url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
        "Accept-Encoding": "identity",
      },
    });

    response.data.result.tradeArticleList.map((product, index) => {
      totalPrice += product.item.productSale.cost;
      num++;
    });
  }

  return { price: totalPrice, num: num };
};

module.exports = {
  getPrice,
};
