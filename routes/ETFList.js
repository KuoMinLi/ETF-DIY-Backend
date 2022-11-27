const express = require('express');

const router = express.Router();
const ETFList = require('../models/ETFModel');

router.get('/', async (req, res) => {
  const ETFListAll = await ETFList.find();
  const ETFListData = ETFListAll.reduce((acc, item) => {
    const {
      id, name, code, custodyFee, managementFee, category,
    } = item;
    const ETF = {
      id, name, code, custodyFee, managementFee, category,
    };
    acc.push(ETF);
    return acc;
  }, []);

  res.status(200).json({
    status: 'success',
    data: ETFListData,
  });
});

router.get('/:code', async (req, res) => {
  const { code } = req.params;
  try {
    const ETFListData = await ETFList.find({ code });

    res.status(200).json({
      status: 'success',
      data: ETFListData,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: '查詢失敗',
      data: error,
    });
  }
});

router.post('/', async (req, res) => {
  const {
    name, code, custodyFee, managementFee, category, content,
  } = req.body.data;
  try {
    const ckeckETFCode = await ETFList.find({ code });
    const ckeckETFName = await ETFList.find({ name });
    if (ckeckETFCode.length > 0 || ckeckETFName.length > 0) {
      res.status(400).json({
        status: 'fail',
        message: '已有此ETF',
      });
      return;
    }
    const newETFList = await ETFList.create({
      name,
      code,
      custodyFee,
      managementFee,
      category,
      content,
    });
    res.status(200).json({
      status: 'success',
      message: '新增成功',
      data: newETFList,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: '新增失敗',
      data: error,
    });
  }
});

module.exports = router;
