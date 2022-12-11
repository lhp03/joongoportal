var express = require("express");
var router = express.Router();
let search = require("../module/searchModule");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  console.log(req.query.keyword);
  console.log(req.query.page);
  const joongonara = await search.getJoonggoNara(
    req.query.keyword,
    req.query.page
  );

  const result = {
    joongonara: joongonara,
  };
  res.send(result);
});

module.exports = router;
