var express = require("express");
var router = express.Router();
const TWSECode = require("../models/TWSECodeModel");

router.get("/", async (req, res, next) => {
  const TWSECodeData = await TWSECode.find();
  try {
  res.status(200).json({
    status: "success",
    data: TWSECodeData,
  });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "查詢失敗",
      data: error,
    });
  }
});

router.post("/", async (req, res, next) => {
  console.log(req.body);
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
