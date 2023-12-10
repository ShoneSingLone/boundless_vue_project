const watch = require("watch");
const path = require("path");
const fs = require("fs");

exports.appUseHMR = function (ioWs) {
	watch.watchTree(`./static_vue2`, { interval: 0.3 }, async function (filename, ...args) {
		if (typeof filename === "string") {
			const extname = path.extname(filename);
			if (extname === ".vue") {
				try {
					const content = fs.readFileSync(filename, "utf-8");
					ioWs.broadcast("hmr", { filename: filename.replace("static_vue2", ""), content });
				} catch (error) {
					console.error(error);
				}
			}
		}
	});
};
