const { verifyToken } = require("../services/authentication");

function checkAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenValue = req.cookies[cookieName];
    if (!tokenValue) {
      return next();
    }
    try {
      const payload = verifyToken(tokenValue);
      req.user = payload;
    } catch (error) {}
    return next();
  };
}

module.exports = {
  checkAuthenticationCookie,
};
