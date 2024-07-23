const { fs, path, _, execCmd } = require("../preprocess.utils");

exports.appUseSocketMiddleware = function (ioWs) {
	function msg(msg, ctx, payload = {}) {
		return {
			msg,
			id: ctx.socket.id,
			payload
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
	ioWs.on("self", (ctx) => {
		try {

			const { data } = ctx || {};
			const { action, cmd, args } = data || {};
			if (action === "cmd") {
				const COMMAND_STRATEGY = {
					openVscode: async () => {
						const { id } = args;
						const name = id.replace("business_", "");
						const pathString = path.resolve(__dirname, `../../vscode.workspace/n2one_${name}.code-workspace`);
						await execCmd(`code . ${pathString}`, {
							log(content) {
								ctx.socket.emit("message", msg("self", ctx, { content }));
							}
						});
					},
					format: async () => {
						const projects = args;
						let project;
						while (project = projects.pop()) {
							const name = project.id.replace("business_", "");
							await execCmd(`npm run lint ${name}`, {
								log(content) {
									ctx.socket.emit("message", msg("self", ctx, { content }));
								}
							});
						}

					},
					dst: async () => {
						const projects = args;
						let project;
						while (project = projects.pop()) {
							const name = project.id.replace("business_", "");
							await execCmd(`npm run d.ts api ${name}`, {
								log(content) {
									ctx.socket.emit("message", msg("self", ctx, { content }));
								}
							});
							await execCmd(`npm run d.ts opts ${name}`, {
								log(content) {
									ctx.socket.emit("message", msg("self", ctx, { content }));
								}
							});
						}

					},
				};
				const cmdHander = COMMAND_STRATEGY[cmd];
				cmdHander();
			} else {
				ctx.socket.emit("message", msg("self", ctx, { content: "命令错误" }));
			}


		} catch (error) {
			console.error(error);
		}
	});
};
