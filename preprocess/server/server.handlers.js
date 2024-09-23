const { _, execCmd, fs, path, _n } = require("../preprocess.utils");



/**
 * 将源文件夹下的所有文件夹及文件复制到目标文件夹下，保持同样的接口
 * - 参数必须是绝对路径
 * @param {any} str_srcdir 原文件夹
 * @param {any} str_targetdir 目标文件夹
 */
async function asyncCpDir(str_srcdir, str_targetdir) {
	const [dirs, files] = await _n.asyncAllDirAndFile([str_srcdir]);
	const startIndex = str_srcdir.length + 1;
	const asyncMakeFile = async (todo, handler) => {
		return await Promise.all(
			_.map(todo, async (path_src) => {
				var to = path.join(str_targetdir, path_src.slice(startIndex)).replace(/[\\]/g, "/");
				return await handler(path_src, to);
			})
		);
	};

	/* 先确保文件夹 */
	await asyncMakeFile(dirs, (src, to) => _n.asyncSafeMakeDir(to));
	/* 再复制文件 */
	await asyncMakeFile(files, (src, to) => fs.promises.copyFile(src, to));
}

exports.copyNewProject = async function (name) {
	const projectRootDir = path.resolve(__dirname, "../..", `static_vue2/business_${name}`);
	await _n.asyncRmDir(projectRootDir);
	await fs.promises.mkdir(projectRootDir);
	await asyncCpDir(path.resolve(__dirname, "../..", `static_vue2/business_a_init_element-ui`), projectRootDir);
	let content = await fs.promises.readFile(path.resolve(projectRootDir, "./utils/api.vue"), "utf-8");
	await fs.promises.writeFile(path.resolve(projectRootDir, "./utils/api.vue"), content.replaceAll("_api.xxxxxxx", `_api.${name}`), "utf-8");

	content = await fs.promises.readFile(path.resolve(projectRootDir, "./utils/opts.vue"), "utf-8");
	await fs.promises.writeFile(path.resolve(projectRootDir, "./utils/opts.vue"), content.replaceAll("_opts.xxxxxxx", `_opts.${name}`), "utf-8");

	content = await fs.promises.readFile(path.resolve(projectRootDir, "./index.html"), "utf-8");
	await fs.promises.unlink(path.resolve(projectRootDir, "./index.html"));
	await fs.promises.writeFile(path.resolve(projectRootDir, `./${name}.html`), content.replaceAll("xxxxxxx", name), "utf-8");

	await execCmd(`npm run d.ts api ${name}`);
	await execCmd(`npm run d.ts opts ${name}`);
	await execCmd(`npm run vsws`);
};
