var path = require('path');

module.exports = {
  env: (process.env.NODE_ENV || 'development'),
  webpack: {
    output: {
      path: path.join(__dirname, '../build/assets'),
      htmlPath: '../index.html'
    }
  }
};
