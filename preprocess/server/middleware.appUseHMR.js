const watch = require("watch");
const path = require("path");

exports.appUseHMR = function (ioWs) {
	watch.watchTree(
		`./static_vue2`,
		{ interval: 0.3 },
		async function (filename) {
			if (typeof filename === "string") {
				const extname = path.extname(filename);
				if (extname === ".vue") {
					ioWs.broadcast("hmr", { filename });
				}
			}
		}
	);
};
