exports.appUseSocketMiddleware = function (ioWs) {
	function msg(msg, ctx) {
		return {
			msg,
			id: ctx.socket.id,
			numConnections: ioWs.connections.size
		};
	}
	/**
	 * Socket middlewares
	 */
	ioWs.use(async function (ctx, next) {
		const start = new Date();
		await next();
		const ms = new Date() - start;
		console.log(`${ctx.event} WS ${ms}ms`);
	});
	/**
	 * Socket handlers
	 */
	ioWs.on("connection", ctx => {
		ioWs.broadcast("connections", msg("connection", ctx));
	});

	ioWs.on("disconnect", ctx => {
		ioWs.broadcast("disconnect", msg("disconnect", ctx));
	});
	ioWs.on("all", ctx => {
		ioWs.broadcast("message", msg("all", ctx));
	});
	ioWs.on("other", ctx => {
		ctx.socket.broadcast("message", msg("other", ctx));
		/* 回执 */
		ctx.acknowledge(`send to other,callback with ctx.acknowledge`);
	});
	ioWs.on("self", ctx => {
		ctx.socket.emit("message", msg("self", ctx));
	});
};
