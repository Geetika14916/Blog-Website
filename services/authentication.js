const jwt = require("jsonwebtoken");

const secret = "$uperm@n";

function createToken(user) {
  const payload = {
    name: user.fullName,
    _id: user._id,
    email: user.email,
    profileImgUrl: user.profileImgUrl,
    role: user.role,
  };

  const token = jwt.sign(payload, secret);
  return token;
}

function verifyToken(token) {
  const payload = jwt.verify(token, secret);
  return payload;
}

module.exports = {
  createToken,
  verifyToken,
};
