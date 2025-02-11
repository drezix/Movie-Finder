const sanitizer = require('perfect-express-sanitizer');
const xss = require('xss');

const sanitizedMiddleware = async (req, res, next) => {
  try {
    await new Promise((resolve, reject) => {
      sanitizer.clean({
        xss: true,
        noSql: true,
        sql: true,
      })(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    if (req.body) {
      req.body = Object.keys(req.body).reduce((acc, key) => {
        acc[key] = xss(req.body[key]);
        return acc;
      }, {});
    }

    next();
  } catch (err) {
    next(err); 
  }
};

module.exports = sanitizedMiddleware;