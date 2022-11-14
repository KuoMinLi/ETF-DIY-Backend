const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");
const handleErrorAsync = require("../utils/handleErrorAsync");


const isAuth = handleErrorAsync(async (req, res, next) => {
  // 確認 token 是否存在
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(400).json({
      status: "fail",
      message: "您尚未登入",
    });
  }

  // 驗證 token 正確性
  const decoded = await new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      err ? reject(err) : resolve(payload);
    });
  });
  const currentUser = await User.findById(decoded.id);

  req.user = currentUser;
  next();
});

module.exports = isAuth;