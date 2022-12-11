var express = require("express");
var router = express.Router();
let search = require("../module/searchModule");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  console.log(req.query.keyword);
  const joongonara = await search.getJoonggoNara(req.query.keyword);
  const bunjang = await search.getBunjang(req.query.keyword);
  const hm = await search.getHelloMarket(req.query.keyword);

  const result = {
    joongonara: joongonara,
    bunjang: bunjang,
    hellomarket: hm,
  };
  res.send(result);
});

module.exports = router;
