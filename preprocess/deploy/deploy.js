var fs = require("fs");
var path = require("path");
var { _n } = require("@ventose/utils-node");
var dayjs = require("dayjs");
var adm_zip = require("adm-zip");
const Client = require("@ventose/ssh2").Client;
const subfix = dayjs().format(`YYYY-MM-DD_HH_mm_ss`);

const NEW_VERSION = `\t\twindow.APP_VERSION = "" || "${subfix}" || "";`;
console.log("NEW_VERSION", NEW_VERSION);

const APP_NAME = `ctyun`;
const SEED_PATH = path.resolve(__dirname, "./ctyun/common/libs/seed.js");
const content = fs
	.readFileSync(SEED_PATH, "utf-8")
	.split("\n")
	.map(row => {
		if (/window.APP_VERSION = ""/.test(row)) {
			return NEW_VERSION;
		} else {
			return row;
		}
	});
const content_new = content.join("\n");
fs.writeFileSync(SEED_PATH, content_new);

const { host1, port1, user1, pwd1, root1, rootPwd1 } = {
	host1: "host1",
	port1: 22,
	user1: "user1",
	pwd1: "pwd1",
	root1: "root1",
	rootPwd1: "rootPwd1"
};

/* 主要是ghca-dept有18M，你敢信 */
const TASK_MAP = {
	/* 注册部署 全量，包括ghca-dept*/
	部署全部并注册: {
		filter() {
			return true;
		},
		command: [
			`su ${root1}\n`,
			`${rootPwd1}\n`,
			`pwd
	  cp ./${APP_NAME}.zip /opt/onframework/static/${APP_NAME}.zip
	  chown -R ossuser:ossgroup /opt/onframework/static/${APP_NAME}.zip
	  rm -rf /opt/onframework/static/${APP_NAME}/
	  unzip /home/sopuser/${APP_NAME}.zip -d /opt/onframework/static
	  chown -R ossuser:ossgroup /opt/onframework/static/${APP_NAME}/
	  chmod -R 750 /opt/onframework/static/${APP_NAME}
	  su ossuser
	  whoami
	  cd /opt/oss/Product/apps/MOConsoleFrameworkService/serviceRegister/
	  /opt/oss/manager/agent/DeployAgent/rtsp/python/bin/python  /opt/oss/Product/apps/MOConsoleFrameworkService/serviceRegister/hulkRegister.py "{'deploy_console_info': {'fileName': '${APP_NAME}.zip', 'type': '${APP_NAME}'}}"
	  \n`
		]
	}
};

const CURRENT_TASK = TASK_MAP.部署全部并注册;

const dir = path.resolve(__dirname, `./zips/${subfix}`);

async function archiveFiles() {
	var zip = new adm_zip();
	zip.addLocalFolder(path.resolve(__dirname, `./${APP_NAME}`), APP_NAME, CURRENT_TASK.filter);
	await _n.asyncSafeMakeDir(dir);
	zip.writeZip(`${dir}/${APP_NAME}.zip`);
	return Promise.resolve("archive done");
}

async function deployMainFunction(conn, hostConfigs) {
	return new Promise(async resolve => {
		console.log("🚀:", "hostConfigs.host", JSON.stringify(hostConfigs.host, null, 2));
		async function setup() {
			console.log("Client : ready");
			function uploadZip() {
				return new Promise(resolve => {
					conn.sftp((err, sftp) => {
						if (err) throw err;
						sftp.fastPut(
							`${dir}/${APP_NAME}.zip`,
							`/home/sopuser/${APP_NAME}.zip`,
							err => {
								if (err) throw err;
								resolve("upload done");
							}
						);
					});
				});
			}
			function execCommand() {
				let conmandIndex = 0;

				const conmandArray = CURRENT_TASK.command;

				conn.shell((err, stream) => {
					if (err) throw err;
					let dataIsDone = false;

					function StreamWrite(cmd) {
						console.log(conmandIndex);
						cmd && stream.write(cmd);
					}

					function Close() {
						if (Close.timer) {
							clearTimeout(Close.timer);
						}
						Close.timer = setTimeout(() => {
							conn.end();
						}, 1000 * 60);
					}
					stream
						.on("close", () => {
							console.log("Stream :: close");
							resolve();
						})
						.on("data", data => {
							const log = data.toString();
							console.log(log);
							if (!dataIsDone) {
								dataIsDone = true;
								StreamWrite(conmandArray[conmandIndex++]);
							}

							if (/^Password:/i.test(log)) {
								StreamWrite(conmandArray[conmandIndex++]);
								setTimeout(() => {
									StreamWrite(conmandArray[conmandIndex++]);
								}, 4000);
							}
							if (/iamUserPw:/i.test(log)) {
								StreamWrite(conmandArray[conmandIndex++]);
								setTimeout(() => {
									StreamWrite(conmandArray[conmandIndex++]);
								}, 4000);
							}
							Close();
						});
				});
			}
			console.log(await uploadZip());
			console.log(await execCommand());
		}
		conn.on("ready", setup).connect(hostConfigs);
	});
}

(async _ => {
	await archiveFiles();
	await Promise.all([
		deployMainFunction(new Client(), {
			host: host1,
			port: port1,
			username: user1,
			password: pwd1
		})
	]);
})();
