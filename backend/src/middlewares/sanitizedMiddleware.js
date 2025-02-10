const sanitizer = require('perfect-express-sanitizer');
const xss = require('xss');

const sanitizedMiddleware = (req, res, next) => {
  sanitizer.clean({
    xss: true,
    noSql: true,
    sql: true,
  })(req, res, next);

  if (req.body) {
    req.body = Object.keys(req.body).reduce((acc, key) => {
      acc[key] = xss(req.body[key]);
      return acc;
    }, {});
  }

  next();
};

module.exports = sanitizedMiddleware;