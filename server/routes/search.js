var express = require("express");
var router = express.Router();
let search = require("../module/searchModule");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  console.log(req.query.keyword);
  const naver = await search.getNaver(req.query.keyword, req.query.page);
  const bunjang = await search.getBunjang(
    req.query.keyword,
    req.query.page - 1
  );
  const hm = await search.getHelloMarket(req.query.keyword, req.query.page);

  const products = [...naver.products, ...bunjang, ...hm];

  products.sort((a, b) => {
    return b.date - a.date;
  });

  const result = {
    keywords: naver.recommendKeywordList,
    products: products,
  };
  res.send(result);
});

module.exports = router;
