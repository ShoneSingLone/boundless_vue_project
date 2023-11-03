const Koa = require('koa');
const path = require('path');
const IO = require('koa-socket');
var { appUseHMR, appUseProxy, appUseKoaAssets, appUseSocketMiddleware, appRun } = require("./preprocess/server/middleware");

const app = new Koa();
const ioWs = new IO("ws");

app.pathResolve = (...args) => path.resolve.apply(path, [__dirname, ...args]);
/* *********** */
ioWs.attach(app);
/* *********** */
/* api优先 */
appUseProxy(app);
/* 静态资源 */
appUseKoaAssets(app);
/* *********** */
appUseSocketMiddleware(ioWs);
appUseHMR(ioWs);
/* *********** */
appRun(app);