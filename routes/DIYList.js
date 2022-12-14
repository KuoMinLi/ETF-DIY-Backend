const express = require('express');

const router = express.Router();
const DIYList = require('../models/DIYListModel');
const handleErrorAsync = require('../utils/handleErrorAsync');
const isAuth = require('../utils/isAuth');

router.get('/public', async (req, res) => {
  const DIYListAll = await DIYList.find({ isPublic: true });
  return res.status(200).json({
    status: 'success',
    data: DIYListAll,
  });
});

router.get(
  '/',
  isAuth,
  handleErrorAsync(async (req, res) => {
    const DIYListData = await DIYList.find({ userid: req.user.id });
    return res.status(200).json({
      status: 'success',
      data: DIYListData,
    });
  }),
);

router.get(
  '/:id',
  isAuth,
  handleErrorAsync(async (req, res) => {
    const { id } = req.params;
    const DIYListData = await DIYList.find({ _id: id, userid: req.user.id });
    res.status(200).json({
      status: 'success',
      data: DIYListData,
    });
  }),
);

router.post(
  '/',
  isAuth,
  handleErrorAsync(async (req, res) => {
    const { name, content, isPublic } = req.body.data;
    const userid = req.user.id;
    const nameCheck = await DIYList.find({ name, userid: req.user.id });
    if (nameCheck.length > 0) {
      res.status(400).json({
        status: 'fail',
        message: '已有此名稱',
      });
      return;
    }

    const newDIYList = await DIYList.create({
      name,
      content,
      userid,
      isPublic,
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
  const { name, content } = req.body.data;
  if (!id) {
    res.status(400).json({
      status: 'fail',
      message: '請輸入id',
    });
    return;
  }

  if (!name && !content) {
    res.status(400).json({
      status: 'fail',
      message: '請輸入全部欄位',
    });
    return;
  }

  const DIYListData = await DIYList.findByIdAndUpdate(
    id,
    { name, content },
    { new: true, runValidators: true },
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

router.delete(
  '/:id',
  isAuth,
  handleErrorAsync(async (req, res) => {
    const { id } = req.params;
    const DIYListData = await DIYList.findByIdAndDelete(id);
    res.status(200).json({
      status: 'success',
      message: '刪除成功',
      data: DIYListData,
    });
  }),
);

module.exports = router;
