const { _n, execCmd } = require("./preprocess.utils");

const path = require("path");
const fs = require("fs");
const cheerio = require("cheerio");
const [hooksName] = process.argv.slice(2);

async function main(params) {
	const [, files] = await _n.asyncAllDirAndFile([path.resolve(__dirname, "../static_vue2")]);

	let file_path;
	while (file_path = files.pop()) {
		if (path.extname(file_path) === ".html") {
			console.log(file_path);
			if (hooksName && !String(file_path).includes(hooksName)) {
				continue;
			} else {
				const indexHtmlString = fs.readFileSync(file_path, "utf-8");
				const $ = cheerio.load(indexHtmlString);
				$("#src-root").attr("data-app-version", Date.now());
				const newContent = $.html();
				fs.writeFileSync(file_path, newContent, "utf-8");
				await execCmd(`npm run lint single ${file_path}`);
			}
		}
	}
}

main();
