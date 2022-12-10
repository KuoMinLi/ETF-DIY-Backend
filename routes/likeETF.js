/* eslint-disable consistent-return */
const express = require('express');

const router = express.Router();
const likeETF = require('../models/likeETFModel');
const handleErrorAsync = require('../utils/handleErrorAsync');
const isAuth = require('../utils/isAuth');

router.get(
  '/',
  isAuth,
  handleErrorAsync(async (req, res) => {
    const likeETFData = await likeETF.find({ userid: req.user.id });
    res.status(200).json({
      status: 'success',
      data: likeETFData,
    });
  }),
);

// router.get(
//   '/:id',
//   isAuth,
//   handleErrorAsync(async (req, res) => {
//     const { id } = req.params;
//     const DIYListData = await DIYList.find({ _id: id, userid: req.user.id });
//     res.status(200).json({
//       status: 'success',
//       data: DIYListData,
//     });
//   }),
// );

router.post(
  '/',
  isAuth,
  handleErrorAsync(async (req, res) => {
    const { ETFid } = req.body.data;
    const userid = req.user.id;

    if (ETFid === undefined) {
      res.status(400).json({
        status: 'fail',
        message: 'ETFid is undefined',
      });
      return false;
    }

    try {
      const ckeckETFid = await likeETF.find({ ETFid, userid });
      if (ckeckETFid.length > 0) {
        res.status(400).json({
          status: 'fail',
          message: 'ETFid is exist',
        });
        return false;
      }
      await likeETF.create({
        ETFid,
        userid,
      });
      const newlikeETF = await likeETF.find({ userid: req.user.id });
      res.status(200).json({
        status: 'success',
        message: '新增成功',
        data: newlikeETF,
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: '新增失敗',
        data: error,
      });
    }
  }),
);

router.delete(
  '/',
  isAuth,
  handleErrorAsync(async (req, res) => {
    const { ETFid } = req.body;
    const userid = req.user.id;
    if (ETFid === undefined) {
      res.status(400).json({
        status: 'fail',
        message: 'ETFid is undefined',
      });
      return false;
    }
    try {
      const ckeckETFid = await likeETF.find({ ETFid, userid });
      if (ckeckETFid.length === 0) {
        res.status(400).json({
          status: 'fail',
          message: 'ETFid is not exist',
        });
        return false;
      }
      await likeETF.deleteOne({ ETFid, userid });
      const newlikeETF = await likeETF.find({ userid: req.user.id });
      res.status(200).json({
        status: 'success',
        message: '刪除成功',
        data: newlikeETF,
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: '刪除失敗',
        data: error,
      });
    }
  }),
);

module.exports = router;
