const axios = require("axios");

const getPrice = async (keyword) => {
  const getDates = () => {
    const stringfy = (date) => {
      return (
        date.getFullYear().toString() +
        (date.getMonth() + 1 < 9
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) +
        (date.getDate() < 9 ? "0" + date.getDate() : date.getDate()) +
        (date.getHours() < 9 ? "0" + date.getHours() : date.getHours()) +
        (date.getMinutes() < 9 ? "0" + date.getMinutes() : date.getMinutes()) +
        (date.getSeconds() < 9 ? "0" + date.getSeconds() : date.getSeconds())
      );
    };

    const result = [];

    const now = new Date();
    result.push(stringfy(now));
    const aMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
    result.push(stringfy(aMonthAgo));
    const twoMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
    result.push(stringfy(twoMonthAgo));
    const threeMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
    result.push(stringfy(threeMonthAgo));
    const fourMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
    result.push(stringfy(fourMonthAgo));

    return result;
  };

  const getPriceFromTo = async (from, to) => {
    const response = await axios.get(
      api_url + `&writeTime.min=${from}&writeTime.max=${to}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          Accept: "application/json",
          "Accept-Encoding": "identity",
        },
      }
    );

    let data = { price: 0, num: 0 };

    data.num = response.data.result.tradeArticleList.length;
    response.data.result.tradeArticleList.map((product, index) => {
      data.price += product.item.productSale.cost;
    });

    return data;
  };

  keyword = encodeURI(keyword);
  const api_url = `https://apis.naver.com/cafe-web/cafe-search-api/v4.0/trade-search/all?query=${keyword}&page=1&size=100&recommendKeyword=true&searchOrderParamType=DEFAULT&transactionStatuses=COMPLETED`;

  const [now, aMonthAgo, twoMonthAgo, threeMonthAgo, fourMonthAgo] = getDates();

  return {
    aMonthAgo: await getPriceFromTo(aMonthAgo, now),
    twoMonthAgo: await getPriceFromTo(twoMonthAgo, aMonthAgo),
    threeMonthAgo: await getPriceFromTo(threeMonthAgo, twoMonthAgo),
    fourMonathAgo: await getPriceFromTo(fourMonthAgo, threeMonthAgo),
  };
};

module.exports = {
  getPrice,
};
