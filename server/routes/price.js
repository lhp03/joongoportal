var express = require("express");
var router = express.Router();
let price = require("../module/priceModule");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const result = await price.getPrice(req.query.keyword, 5);
  res.send(result);
});

module.exports = router;
