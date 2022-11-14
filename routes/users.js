const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");
const handleErrorAsync = require("../utils/handleErrorAsync");
const isAuth = require("../utils/isAuth");


const generateSendJWT = (user, res) => {
  // 產生 JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: Date.now() + 60 * 30 * 1000,
  });
  res.status(200).json({
    status: "success",
    token,
    data: {
      name: user.name,
    },
  });
};

/* GET users listing. */
// router.get("/", async (req, res, next) => {
//   const allUser = await User.find();
//   res.status(200).json({
//     status: "success",
//     data: allUser,
//   });
// });

// router.delete("/", async (req, res, next) => {
//   await User.deleteMany({});
//   res.status(200).json({
//     status: "success",
//     data: "",
//   });
// });

router.post("/sign_up", async (req, res, next) => {
  try {
    const data = req.body;
    let { name, email, password, confirmPassword } = data;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        status: "fail",
        message: "請輸入所有欄位",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "fail",
        message: "密碼不一致",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        status: "fail",
        message: "請輸入正確的 Email 格式",
      });
    }

    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return res.status(400).json({
        status: "fail",
        message: "此 Email 已被註冊",
      });
    }

    if (!validator.isLength(password, { min: 8 })) {
      return res.status(400).json({
        status: "fail",
        message: "密碼長度至少為 8 個字元",
      });
    }

    if (!validator.isLength(name, { min: 2 })) {
      return res.status(400).json({
        status: "fail",
        message: "名字長度至少為 2 個字元",
      });
    }

    password = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: Date.now() + 60 * 30 * 1000,
    });
    res.status(200).json({
      status: "success",
      message: "已成功新增使用者資訊",
      token,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    // 回傳失敗
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});

router.post("/sign_in", async (req, res, next) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "請輸入所有欄位",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        status: "fail",
        message: "請輸入正確的 Email 格式",
      });
    }

    const userEmail = await User.findOne({ email });
    if (!userEmail) {
      return res.status(400).json({
        status: "fail",
        message: "此 Email 尚未註冊",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (!auth) {
        return res.status(400).json({
          status: "fail",
          message: "密碼錯誤",
        });
      }
      generateSendJWT(user, res);
    }
  } catch (error) {
    // 回傳失敗
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});

router.get(
  "/user_info",
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    const user = await User.find({ _id: req.user.id });
    res.status(200).json({
      status: "success",
      data: user,
    });
  })
);




module.exports = router;
