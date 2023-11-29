const { _n } = require("@ventose/utils-node");
const path = require("path");
const asyncFs = require("fs").promises;

function VueLoader(sourceCodeString) {
	function getSource(source, pickType) {
		try {
			var regex = new RegExp(`<${pickType}[^(>|())]*>`);
			var openingTag = source.match(regex);
			var targetSource = "";
			if (!openingTag) {
				return [targetSource, {}];
			} else {
				openingTag = openingTag[0];
				targetSource = source.slice(source.indexOf(openingTag) + openingTag.length, source.lastIndexOf("</" + pickType + ">"));
			}
			/* TODO: jsx解析*/
			if (["template", "setup-render"].includes(pickType)) {
				targetSource = targetSource.replace(/`/g, "\\`");
			}
			return [targetSource];
		} catch (error) {
			console.error(error);
		}
	}

	function splitCode() {
		const [scritpSourceCode] = getSource(sourceCodeString, "script");
		const [templateSourceCode] = getSource(sourceCodeString, "template");
		const [styleSourceCode] = getSource(sourceCodeString, "style");
		return {
			scritpSourceCode,
			templateSourceCode,
			styleSourceCode
		};
	}

	return splitCode();
}

async function main(params) {
	const [dir, files] = await _n.asyncAllDirAndFile([path.resolve(__dirname, "../static_vue2/business_book")]);

	_n.each(files, async i => {
		if (path.extname(i) === ".vue") {
			const str = await asyncFs.readFile(i, "utf-8");
			const { scritpSourceCode, templateSourceCode, styleSourceCode } = VueLoader(str);

			await asyncFs.writeFile(
				i,
				`<template>
            ${templateSourceCode}
            </template>
            
            <script>
            export default async function () {
                ${scritpSourceCode}
            }
            </script>`,
				"utf-8"
			);
		}
	});
	// const i = files[0];
}

// main();
