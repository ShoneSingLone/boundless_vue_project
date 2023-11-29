const { _n } = require("@ventose/utils-node");
const path = require("path");
const asyncFs = require("fs").promises;

async function main(params) {
	let cssContent = await asyncFs.readFile("../static_vue2/business_book/assets/styles/main.css", "utf-8");
	const pxReg = /([-+]?[0-9]*\.?[0-9]+)rem/g;
	cssContent = cssContent.replace(pxReg, (full, num) => {
		return `${num * 16}px`;
	});
	await asyncFs.writeFile("./main.css", cssContent, "utf-8");
}

main();
