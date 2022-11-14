var express = require("express");
var router = express.Router();
const ETFList = require("../models/ETFListModel");
const ETFContent = require("../models/ETFContentModel");

router.get("/", async (req, res, next) => {
  const ETFListData = await ETFList.find();
  res.status(200).json({
    status: "success",
    data: ETFListData,
  });
});


router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const ETFListData = await ETFList.find({ _id: id });
  const ETFContentData = await ETFContent.find({ ETFList: id });
  try {
    res.status(200).json({
      status: "success",
      data: {
        item: ETFListData,
        content: ETFContentData
      },
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
  const { name, code, custodyFee, managementFee, category } = req.body;
  const newETFList = await ETFList.create({
    name,
    code,
    custodyFee,
    managementFee,
    category,
  });
  res.status(200).json({
    status: "success",
    message: "新增成功",
    data: newETFList,
  });
});


module.exports = router;
