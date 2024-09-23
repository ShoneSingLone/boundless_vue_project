const { fs, path, _ } = require("../preprocess.utils");

const TARGET_FILE_ARRAY = [path.resolve(__dirname, "../../static_vue2/common/libs/common.js")];

/**
 * @description asdfasdf
 *
 * @param {any} content
 * @returns
 */
function getFnName(content) {
	const res = content.match(/@name (.*)/);
	if (res) {
		return res[1];
	}
	return "";
}

function getStyle(content) {
	const isDeprecated = content.indexOf("@Deprecated") > -1;
	const style = isDeprecated ? ` style="color:gray;text-decoration-line: line-through;"` : "";
	return style;
}

function genMdSummary(content) {
	const lineArray = content.split("*");
	console.log("🚀:", "lineArray", JSON.stringify(lineArray, null, 2));
	const title = getFnName(content);
	const style = getStyle(content);
	return `\r\n<details>
<summary${style}> ${title} </summary>
<br>
<pre> <code>${content}</code> </pre>
</details>
`;
}

/**
 * @description 生成markdown文档
 *
 * @param {any} fileurls
 * @param {any} readMeMd
 */
function makeMarkdownContent(fileurls, readMeMd) {
	_.each(fileurls, fileurl => {
		const fnSrcString = fs.readFileSync(fileurl, "utf-8");
		const block_regex = /\/\*\*([\s\S]*?)\*\//g;
		const blocks = fnSrcString.match(block_regex);
		if (Array.isArray(blocks) && blocks.length > 0) {
			_.each(blocks, block => {
				const content = genMdSummary(block);
				fs.appendFileSync(readMeMd, content);
			});
		}
	});
}

function genMarkdown() {
	const readMeMd = path.resolve(__dirname, "../../readme.api.md");
	fs.writeFileSync(
		readMeMd,
		`# COMMONJS_API_DOC
[此项目说明-内网在线文档](http://10.143.133.216:3001/wiki/#/wiki_all?wiki_id=329)
------
> 本文自动生成，直接修改会被覆盖，可以修改内网在线文档
------
`
	);
	makeMarkdownContent(TARGET_FILE_ARRAY, readMeMd);
}

genMarkdown();
