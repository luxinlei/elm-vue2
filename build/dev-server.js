// 检查 Nodejs 和 npm 版本
require('./check-versions')();

// 获取基本配置
var config = require('../config');
// 如果 Node 的环境变量中没有设置当前的环境（NODE_ENV），则使用config中的dev环境配置作为当前的环境
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn');            // opn 是一个可以调用默认软件打开网址、图片、文件等内容的插件，使用 opn 自动打开 dev-server 坚挺的端口
var path = require('path');          // nodejs 的一个 api，提供了一些文件路径的操作方法
var express = require('express');    // 是 nodejs 的一个框架，我们使用 express  启动一个 web server
var webpack = require('webpack');    // 引入 webpack
var proxyMiddleware = require('http-proxy-middleware');      // http-proxy-middleware是一个express中间件，用于将http请求代理到其他服务器
var webpackConfig = require('./webpack.dev.conf');           // 开发环境下的 webpack 配置

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port;              // dev-server 监听的端口，如果没有在命令行传入端口号，则使用config.dev.port设置的端口，例如8080
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser;          // 用于判断是否要自动打开浏览器的布尔变量，当配置文件中没有设置自动打开浏览器的时候其值为 false
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable;                      // HTTP 代理表，指定规则，将某些API请求代理到相应的服务器

var app = express();                                         // 创建 express 服务器

var appData = require('../data.json');                       // 引入 mock 使用的数据
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

var apiRoutes = express.Router();

apiRoutes.get('/seller', function (req, res) {
  res.json({
    erron: 0,
    data: seller
  })
});

apiRoutes.get('/ratings', function (req, res) {
  res.json({
    erron: 0,
    data: ratings
  })
});

apiRoutes.get('/goods', function (req, res) {
  res.json({
    erron: 0,
    data: goods
  })
});

app.use('/api', apiRoutes);

var compiler = webpack(webpackConfig);                                  // webpack 根据配置开始编译打包源码并返回 compiler 对象

var devMiddleware = require('webpack-dev-middleware')(compiler, {       // webpack-dev-middleware将webpack编译打包后得到的产品文件存放在内存中而没有写进磁盘
  publicPath: webpackConfig.output.publicPath,                          // 设置访问路径为 webpack 配置中的 output 里面所对应的路径
  quiet: true                                                           // 设置为true，使其不要在控制台输出日志
});

var hotMiddleware = require('webpack-hot-middleware')(compiler, {       // webpack-hot-middleware，用于实现热重载功能的中间件
  log: false,                                                           // 关闭控制台的日志输出
  heartbeat: 2000                                                       // 发送心跳包的频率
})

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {                 // webpack(重新)编译打包完成后并将js、css等文件inject到html文件之后，通过热重载中间件强制页面刷新
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {                    // 根据 proxyTable 中的代理请求配置来设置express服务器的http代理规则
  var options = proxyTable[context];
  if (typeof options === 'string') {
    options = {target: options};                                        // 格式化 options，例如将'www.example.com'变成{ target: 'www.example.com' }
  }
  app.use(proxyMiddleware(options.filter || context, options))
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());                     // 重定向不存在的 URL，用于支持 SPA（单页应用）

// serve webpack bundle output
app.use(devMiddleware);                                                 // 挂载 webpack-dev-middleware 中间件，提供 webpack 编译打包后的产品文件服务

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);                                                 // 挂载热重载中间件

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);      // 提供 static 文件夹上的静态文件服务
app.use(staticPath, express.static('./static'));

var uri = 'http://localhost:' + port;              // 访问链接

var _resolve;                                      // 创建promise，在应用服务启动之后resolve,便于外部文件require了这个dev-server之后的代码编写
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...');            // webpack-dev-middleware 等待 webpack 完成所有编译打包之后输出提示语到控制台，表明服务正式启动
devMiddleware.waitUntilValid(() => {                // 服务正式启动才自动打开浏览器进入页面
  console.log('> Listening at ' + uri + '\n');
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
});

var server = app.listen(port);                       // 启动express服务器并监听相应的端口

module.exports = {                                   // 暴露本模块的功能给外部使用
  ready: readyPromise,
  close: () => {
    server.close()
  }
};
