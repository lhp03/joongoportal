var express = require("express");
var router = express.Router();
let search = require("../module/searchModule");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const naver = await search.getNaver(req.query.keyword, req.query.page);

  const result = {
    naver: naver,
  };
  res.send(result);
});

module.exports = router;
