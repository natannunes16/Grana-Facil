const jwt = require('jsonwebtoken');

const authContext = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return { user };
      } catch (err) {
        throw new Error('Invalid/Expired token');
      }
    }
  }
  return {};
};

module.exports = authContext;
