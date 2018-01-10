var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var webpack = require('webpack');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const compiler = webpack(require('../webpack.dev.config'));

function createWebpackMiddleware() {
  return webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: compiler.publicPath,
    silent: true,
    stats: 'errors-only',
  });
}

function addWebpackHotMiddleWare(app, middleware){
  app.use(webpackHotMiddleware(compiler));
  const filename = path.join(compiler.outputPath, "index.html");
  
  app.get('*', (req, res) => {
    console.log(filename);
    middleware.fileSystem.readFile(filename, (err, file) => {
      if (err) {
        console.log(err);
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
}

function addMiddleware(app) {

  const middleware = createWebpackMiddleware();
  app.use(middleware);
  addWebpackHotMiddleWare(app, middleware)
};

var app = express();
app.use(require("webpack-hot-middleware")(compiler));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

addMiddleware(app);

module.exports = app;
