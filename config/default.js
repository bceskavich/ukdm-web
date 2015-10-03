var path = require('path');

module.exports = {
  env: (process.env.NODE_ENV || 'development'),
  webpackServer: {
    port: 8888
  },
  server: {
    port: 5000
  },
  webpack: {
    output: {
      path: path.join(__dirname, '../build/assets'),
      htmlPath: 'index.html'
    }
  }
};
