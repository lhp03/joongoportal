const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

const getUtf8Query = (query) => {
  let buf = iconv.encode(query, "euc-kr");
  let encodeStr = "";

  for (let i = 0; i < buf.length; i++) {
    encodeStr += "%" + buf[i].toString("16");
  }

  encodeStr = encodeStr.toUpperCase();

  return encodeStr;
};

const getListInNaver = async (clubid, keyword, menuid = "") => {
  let display = 50;
  let page = 1;
  keyword = getUtf8Query(keyword);

  const base_url = "https://cafe.naver.com";
  const url = `https://cafe.naver.com/ArticleSearchList.nhn?search.clubid=${clubid}&search.menuid=${menuid}&search.searchdate=all&search.searchBy=1&search.sortBy=date&search.option=0&userDisplay=${display}&search.query=${keyword}&search.includeAll=&search.exclude=&search.include=&search.exact=&search.page=${page}`;

  const response = await axios.get(url, {
    header: { "User-Agent": "Mozilla/5.0", accept: "text/html" },
    responseType: "arraybuffer",
    responseEncoding: "binary",
  });

  const content = iconv.decode(response.data, "CP949");
  const $ = cheerio.load(content);
  let result_arr = [];

  $("a.article").map((i, element) => {
    let obj = {
      title: $(element)
        .text()
        .trim()
        .replaceAll("\n", " ")
        .replace(/\s{2,}/gi, " "),
      link: base_url + $(element).attr("href"),
    };

    result_arr.push(obj);
  });

  return result_arr;
};

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

  let product_list = [];

  response.data.list.map((element) => {
    if (element.ad) return true;
    let product_obj = {
      title: element.name,
      location: element.location,
      product_image: element.product_image,
      price: element.price,
      link: `https://m.bunjang.co.kr/products/${element.pid}`,
      update_time: element.update_time,
      tag: element.tag,
    };

    product_list.push(product_obj);
  });

  return product_list;
};

const getHelloMarket = async (keyword, page = 1) => {
  const base_url = "https://www.hellomarket.com";
  keyword = encodeURI(keyword);

  const search_url = `${base_url}/api/search/items?q=${keyword}&page=${page}&startTime=${new Date().valueOf()}`;
  const response = await axios.get(search_url);

  let product_list = [];

  response.data.list.map((element) => {
    let product_obj = {
      id: element.item.itemIdx,
      title: element.item.title,
      product_image: element.item.media.imageUrl,
      price: element.item.property.price.amount,
      status: element.item.property.sellState.name,
      usedType: element.item.property.usedType.name,
      timeago: element.item.timeago,
    };
    product_list.push(product_obj);
  });

  return product_list;
};

const getJoonggoNara = async (keyword, page = 1) => {
  let display = 50;
  keyword = getUtf8Query(keyword);

  const base_url = "https://cafe.naver.com";
  const url = `https://cafe.naver.com/ArticleSearchList.nhn?search.clubid=10050146&search.searchdate=all&search.searchBy=1&search.sortBy=date&search.option=0&userDisplay=${display}&search.query=${keyword}&search.includeAll=&search.exclude=&search.include=&search.exact=&search.page=${page}`;

  const response = await axios.get(url, {
    header: { "User-Agent": "Mozilla/5.0", accept: "text/html" },
    responseType: "arraybuffer",
    responseEncoding: "binary",
  });

  const content = iconv.decode(response.data, "CP949");
  const $ = cheerio.load(content);
  let result_arr = [];

  $("table tbody tr").map((i, element) => {
    if ($(element).find("a.article") == "") return;
    let obj = {
      title: $(element)
        .find("a.article")
        .text()
        .trim()
        .replaceAll("\n", " ")
        .replace(/\s{2,}/gi, " "),
      link: base_url + $(element).find("a.article").attr("href"),
      date: $(element).find("td.td_date").text(),
      view: $(element).find("td.td_view").text(),
    };

    result_arr.push(obj);
  });

  return result_arr;
};

module.exports = {
  getBunjang,
  getHelloMarket,
  getJoonggoNara,
};
