var express = require("express");
var router = express.Router();
let search = require("../module/searchModule");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  console.log(req.query.order);
  const naver = await search.getNaver(
    req.query.keyword,
    req.query.page,
    req.query.order
  );
  const bunjang = await search.getBunjang(
    req.query.keyword,
    req.query.page - 1,
    req.query.order
  );
  const hm = await search.getHelloMarket(
    req.query.keyword,
    req.query.page,
    req.query.order
  );

  const products = [...naver.products, ...bunjang, ...hm];

  products.sort((a, b) => {
    if (req.query.order === "DATE_DESC") return b.date - a.date;
    else if (req.query.order === "COST_ASC") return a.price - b.price;
    else if (req.query.order === "COST_DESC") return b.price - a.price;
  });

  const result = {
    keywords: naver.recommendKeywordList,
    products: products,
  };
  res.send(result);
});

module.exports = router;
