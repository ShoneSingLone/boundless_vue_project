const { _n } = require("@ventose/utils-node");
const path = require("path");
const fs = require("fs");
const cheerio = require("cheerio");

async function main(params) {
	const [, files] = await _n.asyncAllDirAndFile([path.resolve(__dirname, "../static_vue2")]);
	_n.each(files, async i => {
		if (path.extname(i) === ".html") {
			const indexHtmlString = fs.readFileSync(i, "utf-8");
			const $ = cheerio.load(indexHtmlString);
			$("#src-root").attr("data-app-version", Date.now());
			const newContent = $.html();
			fs.writeFileSync(i, newContent, "utf-8");
		}
	});
}

main();
