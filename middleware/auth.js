const jwt = require("jsonwebtoken");

exports.auth = function(req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwt.verify(token, "randomString");
    req.user = decoded.user;
    console.log(req.user)
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send({ error: { message: 'token expired' } });
  }
};