const axios = require("axios");

const getRequestId = () => {
  const date = new Date();

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

const getBunjang = async (keyword, page = 0) => {
  keyword = encodeURI(keyword);

  const request_id = getRequestId();

  const search_url = `https://api.bunjang.co.kr/api/1/find_v2.json?q=${keyword}&order=score&page=${page}&request_id=${request_id}&stat_device=w&n=30&stat_category_required=1&req_ref=search&version=4`;
  const response = await axios.get(search_url);

  let products = [];
  //state: 0: 판매중, 1: 예약완료 3: 판매완료
  //used: 1: 중고 2: 새상품 13: 중고

  response.data.list.map((element) => {
    if (element.ad) return true;

    products.push({
      from: "BJ",
      url: `https://m.bunjang.co.kr/products/${element.pid}`,
      img_url: element.product_image,
      title: element.name,
      date: element.update_time * 1000,
      price: element.price,
      state:
        element.status === "0"
          ? "ON_SALE"
          : element.status === "1"
          ? "RESERVED"
          : element.status === "3"
          ? "COMPLETED"
          : undefined,
      used:
        element.used === 1 || element.used === 13
          ? "NEW"
          : element.used === 2
          ? "USED"
          : undefined,
      tag: element.tag,
    });
  });

  return products;
};

const getHelloMarket = async (keyword, page = 1) => {
  const base_url = "https://www.hellomarket.com";
  keyword = encodeURI(keyword);

  const search_url = `${base_url}/api/search/items?q=${keyword}&page=${page}&startTime=${new Date().valueOf()}`;
  const response = await axios.get(search_url);

  let products = [];

  //state: ForSale: 판매중
  //used: SecondHand : 사용감이 있는 깨끗한 상품, AsNew: 거의 새상품, NotUsed 새 상품(미개봉), SomeFlaws: 사용흔적이 많이 있는 상품

  response.data.list.map((element) => {
    products.push({
      from: "HM",
      url: `https://www.hellomarket.com/item/${element.item.itemIdx}`,
      img_url: element.item.media.imageUrl,
      title: element.item.title,
      date: element.item.timestamp,
      price: element.item.property.price.amount,
      state:
        element.item.property.sellState.code === "ForSale"
          ? "ON_SALE"
          : undefined,
      used:
        element.item.property.usedType.code === "NotUsed"
          ? "NEW"
          : element.item.property.usedType.code === "AsNew"
          ? "ALMOST_NEW"
          : element.item.property.usedType.code === "Secondhand" ||
            element.item.property.usedType.code === "SomeFlaws"
          ? "USED"
          : undefined,
    });
  });

  return products;
};

const getNaver = async (keyword, page = 1) => {
  keyword = encodeURI(keyword);
  const api_url = `https://apis.naver.com/cafe-web/cafe-search-api/v4.0/trade-search/all?query=${keyword}&page=${page}&size=30&recommendKeyword=true&searchOrderParamType=DEFAULT`;

  const response = await axios.get(api_url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "application/json",
      "Accept-Encoding": "identity",
    },
  });

  let products = [];
  let keywords = response.data.result.recommendKeywordList;

  response.data.result.tradeArticleList.map((product, index) => {
    products.push({
      from: "NC",
      url: `https://cafe.naver.com/${product.item.cafeUrl}/${product.item.articleId}`,
      cafe_icon: product.item.cafeThumbnailImageUrl,
      cafe_name: product.item.cafeName,
      img_url: product.item.thumbnailImageUrl,
      title: product.item.subject,
      date: product.item.writeTime,
      price: product.item.productSale.cost,
      state: product.item.productSale.saleStatus,
      used: product.item.productSale.productCondition,
      product_name: product.item.productSale.productName,
      content: product.item.content,
    });
  });

  return {
    recommendKeywordList: keywords,
    products: products,
  };
};

module.exports = {
  getBunjang,
  getHelloMarket,
  getNaver,
};
