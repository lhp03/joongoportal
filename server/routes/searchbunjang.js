var express = require("express");
var router = express.Router();
let search = require("../module/searchModule");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const bunjang = await search.getBunjang(req.query.keyword, req.query.page);

  const result = {
    bunjang: bunjang,
  };
  res.send(result);
});

module.exports = router;
