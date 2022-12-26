var express = require("express");
var router = express.Router();
let search = require("../module/searchModule");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const jn = await search.getFeedJoongna();
  const hm = await search.getFeedHelloMarket();
  const bj = await search.getFeedBunjang();

  const result = [...jn, ...hm, ...bj];

  result.sort((a, b) => {
    return b.date - a.date;
  });

  res.send({ feed: result });
});

module.exports = router;
