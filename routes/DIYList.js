var express = require("express");
var router = express.Router();
const DIYList = require("../models/DIYListModel");
const handleErrorAsync = require("../utils/handleErrorAsync");
const isAuth = require("../utils/isAuth");

router.get(
  "/",
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    const DIYListData = await DIYList.find({ userid: req.user.id });

    // const ETFContentData = await ETFContent.find({ ETFList: id }).populate({
    //   path: "ETFList",
    //   select: ["name", "code"],
    // });

    // const DIYListData = await DIYList.find();
    res.status(200).json({
      status: "success",
      data: DIYListData,
    });
  })
);

router.post(
  "/",
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    const { name } = req.body;
    const userid = req.user.id;
    const newDIYList = await DIYList.create({
      name,
      userid,
    });
    res.status(200).json({
      status: "success",
      message: "新增成功",
      data: newDIYList,
    });
  })
);


router.patch("/:id", isAuth, async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const DIYListData = await DIYList.findByIdAndUpdate(id
    , { name }
    , { new: true }
  );
  try {
    res.status(200).json({
      status: "success",
      message: "修改成功",
      data: DIYListData,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "修改失敗",
      data: error,
    });
  }
});

module.exports = router;
