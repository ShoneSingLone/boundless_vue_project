const Koa = require('koa');
const path = require('path');
const IO = require('koa-socket');
const os = require("os");
var { appUseHMR, appUseProxy, appUseKoaAssets, appUseSocketMiddleware } = require("./preprocess/server/middleware");

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

(function appListen(port) {
    app.listen(port)
        .on("error", () => {
            console.log('🚀:', '端口', port + "被占用");
            appListen(++port);
        });
    app.LOCALHOST_PORT = `http://localhost:${port}`;
    console.log("networkInterfaces\n", os.networkInterfaces(), "\n", app.LOCALHOST_PORT);
})(3000);

