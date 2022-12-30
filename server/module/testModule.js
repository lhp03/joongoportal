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

  const search_url = `https://api.bunjang.co.kr/api/1/find_v2.json?q=${keyword}&order=score&page=${page}&request_id=${request_id}&stat_device=w&n=100&stat_category_required=1&req_ref=search&version=4`;
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
