var express = require("express");
var router = express.Router();
const TWSECode = require("../models/TWSECodeModel");

router.get("/", async (req, res, next) => {
  const TWSECodeData = await TWSECode.find();
  res.status(200).json({
    status: "success",
    data: TWSECodeData,
  });
});

router.post("/", async (req, res, next) => {
  const { data } = req.body;
 
  const newTWSECode = await TWSECode.create({
    data
  });
  res.status(200).json({
    status: "success",
    message: "新增成功",
    data: newTWSECode,
  });
});

module.exports = router;
