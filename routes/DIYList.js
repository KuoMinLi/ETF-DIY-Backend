const express = require('express');

const router = express.Router();
const DIYList = require('../models/DIYListModel');
const handleErrorAsync = require('../utils/handleErrorAsync');
const isAuth = require('../utils/isAuth');

router.get(
  '/',
  isAuth,
  handleErrorAsync(async (req, res) => {
    const DIYListData = await DIYList.find({ userid: req.user.id });
    res.status(200).json({
      status: 'success',
      data: DIYListData,
    });
  }),
);

router.get('/:id', isAuth, handleErrorAsync(async (req, res) => {
  const { id } = req.params;
  const DIYListData = await DIYList.find({ _id: id, userid: req.user.id });
  res.status(200).json({
    status: 'success',
    data: DIYListData,
  });
}));

router.post(
  '/',
  isAuth,
  handleErrorAsync(async (req, res) => {
    const { name, content } = req.body;
    const userid = req.user.id;
    const newDIYList = await DIYList.create({
      name,
      content,
      userid,
    });
    res.status(200).json({
      status: 'success',
      message: '新增成功',
      data: newDIYList,
    });
  }),
);

router.patch('/:id', isAuth, async (req, res) => {
  const { id } = req.params;
  const { name, content } = req.body;
  const DIYListData = await DIYList.findByIdAndUpdate(
    id,
    { name, content },
    { new: true },
  );
  try {
    res.status(200).json({
      status: 'success',
      message: '修改成功',
      data: DIYListData,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: '修改失敗',
      data: error,
    });
  }
});

module.exports = router;
