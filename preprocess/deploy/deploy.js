var fs = require("fs");
var path = require("path");
var dayjs = require("dayjs");
var adm_zip = require("adm-zip");
const Client = require("@ventose/ssh2").Client;
const subfix = dayjs().format(`YYYY-MM-DD_HH_mm_ss`);
const { host1, host2, user1, host1user1Pwd, pwd1, user2, pwd2 } = require("../../../privateConfigs_n2one_azure.js").deploy;

const newVersion = `window.APP_VERSION = "${subfix}"`;
console.log(newVersion);

/* 主要是ghca-dept有18M，你敢信 */
const TASK_MAP = {
	/* 注册部署 全量，包括ghca-dept*/
	部署全部并注册: {
		filter() {
			return true;
		},
		command: [
			`su ${user2}\n`,
			`${pwd2}\n`,
			`pwd
	  cp ./aws_ecs.zip /opt/onframework/static/aws_ecs.zip
	  chown -R ossuser:ossgroup /opt/onframework/static/aws_ecs.zip
	  rm -rf /opt/onframework/static/aws_ecs/
	  unzip /home/sopuser/aws_ecs.zip -d /opt/onframework/static
	  chown -R ossuser:ossgroup /opt/onframework/static/aws_ecs/
	  chmod -R 750 /opt/onframework/static/aws_ecs
	  su ossuser
	  whoami
	  cd /opt/oss/Product/apps/MOConsoleFrameworkService/serviceRegister/
	  /opt/oss/manager/agent/DeployAgent/rtsp/python/bin/python  /opt/oss/Product/apps/MOConsoleFrameworkService/serviceRegister/hulkRegister.py "{'deploy_console_info': {'fileName': 'aws_ecs.zip', 'type': 'aws_ecs'}}"
	  \n`
		]
	}
};

const CURRENT_TASK = TASK_MAP.部署全部并注册;

const entryPath = path.resolve(__dirname, "../src/static/aws_ecs/ghca-dep/1.0.4/lib/module/entry.js");
const entryString = fs.readFileSync(entryPath, "utf-8");
fs.writeFileSync(entryPath, entryString.replace(/window.APP_VERSION = "(.*)"/, newVersion));

const AppName = `aws_ecs`;
const dir = path.resolve(__dirname, `./zips/${subfix}`);

async function archiveFiles() {
	var zip = new adm_zip();
	zip.addLocalFolder(path.resolve(__dirname, `../src/static/${AppName}`), AppName, CURRENT_TASK.filter);
	fs.mkdirSync(dir);
	zip.writeZip(`${dir}/${AppName}.zip`);
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
						sftp.fastPut(`${dir}/${AppName}.zip`, `/home/sopuser/${AppName}.zip`, err => {
							if (err) throw err;
							resolve("upload done");
						});
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
			port: 22,
			username: user1,
			password: host1user1Pwd
		}) /* ,
        deployMainFunction(new Client(), {
            host: host2,
            port: 22,
            username: user1,
            password: pwd1
        }) */
	]);
})();
