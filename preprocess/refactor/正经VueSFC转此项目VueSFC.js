const { fs, path, _, _n, VueLoader } = require("../preprocess.utils");
const asyncFs = fs.promises;
async function main(params) {
	const [dir, files] = await _n.asyncAllDirAndFile([
		path.resolve(__dirname, "../static_vue2/business_book")
	]);

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
