var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.development.config');

new WebpackDevServer(webpack(config), {
  contentBase: 'http://localhost:8082',
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(8082, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:8082');
});
