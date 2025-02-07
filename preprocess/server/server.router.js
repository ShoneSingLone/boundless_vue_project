const { fs, path, _, execCmd } = require("../preprocess.utils");
const { copyNewProject } = require("./server.handlers");
const koaRouter = require("koa-router");

let projectsDB = (function () {
	try {
		const projects = fs.readFileSync(path.resolve(__dirname, "./db/projects.json"), {
			encoding: "utf8"
		});
		if (projects.length > 2) {
			return JSON.parse(projects);
		}
		throw new Error("");
	} catch (error) {
		const { list } = getAllProjects();
		return list;
	}
})();

exports.Router = function () {
	const router = new koaRouter();
	router.post("/boundless-api/project/command", async function (ctx) {
		const { body } = ctx.request || {};
		const { cmd, args } = body || {};

		const COMMAND_STRATEGY = {
			openVscode: async function () {
				const { id } = args;
				const name = id.replace("business_", "");
				const pathString = path.resolve(
					__dirname,
					`../../vscode.workspace/n2one_${name}.code-workspace`
				);
				await execCmd(`code . ${pathString}`);
			}
		};

		const cmdHander = COMMAND_STRATEGY[cmd];
		if (cmdHander) {
			const response = await cmdHander();
			ctx.body = response;
		} else {
			ctx.body = {
				code: 500,
				msg: "error"
			};
		}
	});
	router.post("/boundless-api/project/update_info", async function (ctx) {
		const { body } = ctx.request || {};
		const { update, create } = body || {};

		if (update) {
			const projects = update;
			if (projects.length) {
				await fs.promises.writeFile(
					path.resolve(__dirname, "./db/projects.json"),
					JSON.stringify(projects),
					{ encoding: "utf8" }
				);
				projectsDB = projects;
				return (ctx.body = {
					code: 200,
					data: projects
				});
			}
		}

		const { name, desc } = create || {};
		if (name) {
			if (
				_.some(projectsDB, db => {
					return name === db.id.replace("business_", "");
				})
			) {
				return (ctx.body = {
					code: 500,
					msg: "项目名称重复"
				});
			} else {
				await copyNewProject(name);

				projectsDB.push({
					id: `business_${name}`,
					name,
					desc,
					children: [
						{
							id: `business_${name}_${name}.html`,
							parent: `business_${name}`,
							desc: "",
							name: `${name}.html`
						}
					]
				});
				await fs.writeFileSync(
					path.resolve(__dirname, "./db/projects.json"),
					JSON.stringify(projectsDB),
					{ encoding: "utf8" }
				);
				return (ctx.body = {
					code: 200,
					data: projectsDB
				});
			}
		}

		return (ctx.body = {
			code: 500,
			msg: "500"
		});
	});
	router.get("/boundless-api/project/all", async function (ctx) {
		ctx.body = {
			code: 200,
			data: projectsDB
		};
	});
	return router;
};

function getAllProjects() {
	const dirList = fs.readdirSync(path.resolve(__dirname, "../../static_vue2"));
	const businessDirList = dirList.filter(item => /^business_/.test(item));
	const targetData = {};
	for (const appDirName of businessDirList) {
		const appDirPath = path.resolve(__dirname, "../../static_vue2", appDirName);
		const appDirList = fs.readdirSync(appDirPath);
		targetData[appDirName] = appDirList.filter(item => /.html$/.test(item));
	}

	const list = _.map(targetData, (contents, name) => {
		return {
			id: name,
			desc: "",
			name,
			children: _.map(contents, content => {
				return {
					id: `${name}_${content}`,
					parent: name,
					desc: "",
					name: content
				};
			})
		};
	});
	fs.writeFileSync(path.resolve(__dirname, "./db/projects.json"), JSON.stringify(list), {
		encoding: "utf8"
	});
	return { list, targetData };
}
