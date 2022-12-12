var express = require("express");
var router = express.Router();
let search = require("../module/searchModule");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const hellomarket = await search.getHelloMarket(
    req.query.keyword,
    req.query.page
  );

  const result = {
    hellomarket: hellomarket,
  };
  res.send(result);
});

module.exports = router;
