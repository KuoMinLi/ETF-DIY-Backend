const express = require('express');

const router = express.Router();
const ETFContent = require('../models/ETFContentModel');

router.get('/', async (req, res) => {
  const ETFContentData = await ETFContent.find();
  res.status(200).json({
    status: 'success',
    data: ETFContentData,
  });
});

router.post('/', async (req, res) => {
  const {
    ETFList, name, code, percentage,
  } = req.body;
  const newETFContent = await ETFContent.create({
    ETFList, name, code, percentage,
  });
  try {
    res.status(200).json({
      status: 'success',
      message: '新增成功',
      data: newETFContent,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: '新增失敗',
      data: error,
    });
  }
});

// router.get("/:id", async (req, res, next) => {
//   const { id } = req.params;
//   const ETFContentData = await ETFContent.find({ ETFList: id }).populate({
//     path: "ETFList",
//     select: ["name", "code"],
//   });
//   try {
//     res.status(200).json({
//       status: "success",
//       data: ETFContentData,
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: "查詢失敗",
//       data: error,
//     });
//   }
// });

module.exports = router;
