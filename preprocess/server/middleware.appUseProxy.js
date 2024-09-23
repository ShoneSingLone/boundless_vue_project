// 中间件 /middleware/httpProxy.js
const axios = require('axios');
const qs = require('qs');

exports.useProxy = (opts = {}) => {
    return (ctx, next) => {
        let isUseProxy = (() => {
            if (/yapi_4_dev/.test(ctx.path)) {
                return true;
            }
        })();

        if (isUseProxy) {
            return proxy(ctx, opts);
        } else {
            return next();
        }
    };
};

function proxy(ctx, opts) {

    let params = Object.assign({}, { host: opts.apiHost || '' });

    let reqParams = Object.assign({}, params, formatReqParams(ctx, params));
    if (reqParams.method.toUpperCase() !== 'GET') {
        reqParams.data = params.data || ctx.request.body;
    }
    // application/x-www-form-urlencoded形式转发参数乱码修改
    if (qs.stringify(ctx.request.body)) {
        reqParams = { ...reqParams, data: qs.stringify(ctx.request.body) };
    }

    delete reqParams.headers.host;
    return axios(reqParams)
        .then(res => {
            const { data, headers } = res;
            setResCookies(ctx, headers);
            debugger;
            return data;
        })
        .catch(err => {
            debugger;
            // console.log(err)
            return err;
        });
}
function setResCookies(ctx, headers) {
    const resCookies = headers['set-cookie'];

    if (!headers || !resCookies || !resCookies.length || resCookies.length <= 0 || !resCookies[0]) {
        return;
    }

    ctx.res._headers = ctx.res._headers || {};
    ctx.res._headerNames = ctx.res._headerNames || {};

    ctx.res._headers['set-cookie'] = ctx.res._headers['set-cookie'] || [];
    ctx.res._headers['set-cookie'] =
        ctx.res._headers['set-cookie'].concat && ctx.res._headers['set-cookie'].concat(resCookies);

    ctx.res._headerNames['set-cookie'] = 'set-cookie';
}

/**
 * @param  {} ctx koa当前执行上下文
 * @param  {} params 请求参数
 */
function formatReqParams(ctx, params) {
    let { url, method, headers, protocol } = ctx;
    const { host } = params;
    const hasProtocol = /(http|s):\/\//;

    url = params.url || url;
    method = params.method || method;
    protocol = hasProtocol.test(url) ? url.split(':')[0] : params.protocol || protocol;

    url = `${protocol}://${host}${url}`;
    delete params.host;

    return { url, method, protocol, headers };
}



// // 注册及使用 app.js
// const httpProxy = require('./middleware/httpProxy');
// // apiHost即是你要转发请求到后端的host，其他的参数可以参考axioshttps://github.com/axios/axios
// // 请求转发中间件，暂时只支持转发到另一个地址
// // TODO: 支持多转发
// app.use(
//     httpProxy({
//         apiHost: 'localhost:5000' // 全局端口
//     })
// );

// // 在需要使用的地方调用中间件
// // http://xxx:4000/nest/xx的请求会转发到http://xxx:3000/nest/xx
// if (url.startsWith('/nest')) {
//     const data = await ctx.httpProxy({
//         host: 'localhost:3000' // 多代理，nest地址代理到localhost:3000
//     });
//     // 这里可以做一些请求之后需要处理的事情
//     ctx.body = data;
// }
