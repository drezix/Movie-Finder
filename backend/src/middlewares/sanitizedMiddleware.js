const sanitizer = require('perfect-express-sanitizer');

const sanitizedMiddleware = (req, res, next) => {
  sanitizer.clean({
    xss: true,
    noSql: true,
    sql: true,
  })(req, res, next);
};

module.exports = sanitizedMiddleware;