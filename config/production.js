var path = require('path');

module.exports = {
  env: (process.env.NODE_ENV || 'development'),
  deploy: (process.env.DEPLOY || 'static'),
  webpack: {
    output: {
      path: path.join(__dirname, '../build/assets'),
      htmlPath: '../index.html'
    }
  }
};
