const Koa = require("koa");
const path = require("path");
const IO = require("koa-socket");
const { SERVER_PORT } = require("./server.configs");

/* const NODE_PATH = path.resolve(__dirname, "."); process.env.NODE_PATH = NODE_PATH; Module._initPaths(); */

var { appUseHMR, appUseProxy, appUseKoaAssets, appUseSocketMiddleware, appRun } = require("./middleware");

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
appRun(app, SERVER_PORT);
