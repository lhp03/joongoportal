var express = require("express");
var router = express.Router();
let feed = require("../module/feedModule");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const jn = await feed.getFeedJoongna();
  const hm = await feed.getFeedHelloMarket();
  const bj = await feed.getFeedBunjang();

  const result = [...jn, ...hm, ...bj];

  result.sort((a, b) => {
    return b.date - a.date;
  });

  res.send({ feed: result });
});

module.exports = router;
