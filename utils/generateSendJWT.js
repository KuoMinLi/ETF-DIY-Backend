const jwt = require('jsonwebtoken');

const generateSendJWT = (user, res) => {
  // 產生 JWT token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: Date.now() + 60 * 30 * 1000,
  });
  // 將 JWT token 存入 cookie
  const cookieOptions = {
    expires: new Date(Date.now() + 60 * 30 * 1000),
    httpOnly: true,
  };
  res.cookie('jwt', token, cookieOptions);
  // 將 user 資料傳回
  res.status(200).json({
    status: 'success',
    token,
    data: {
      name: user.name,
    },
  });
};

module.exports = generateSendJWT;
