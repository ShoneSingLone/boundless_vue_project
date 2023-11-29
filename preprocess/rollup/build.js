const { rollup } = require("rollup");

// see below for details on these options
const inputOptions = {
	input: "./main.js"
};

const outputOptionsList = [
	{
		file: "bundle.js",
		format: "cjs"
	}
];

build();

// "rollup": "^4.1.4",

async function build() {
	let bundle;
	let buildFailed = false;
	try {
		// create a bundle
		bundle = await rollup(inputOptions);

		// an array of file names this bundle depends on
		console.log(bundle.watchFiles);

		await generateOutputs(bundle);
	} catch (error) {
		buildFailed = true;
		// do some error reporting
		console.error(error);
	}
	if (bundle) {
		// closes the bundle
		await bundle.close();
	}
	process.exit(buildFailed ? 1 : 0);
}

async function generateOutputs(bundle) {
	for (const outputOptions of outputOptionsList) {
		// generate output specific code in-memory
		// you can call this function multiple times on the same bundle object
		// replace bundle.generate with bundle.write to directly write to disk
		const { output } = await bundle.generate(outputOptions);

		for (const chunkOrAsset of output) {
			console.log(chunkOrAsset.code);
		}
	}
}
