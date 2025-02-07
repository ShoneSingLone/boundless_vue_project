const ALL_CONFIGS = require("./privateCofnigs.js");
const adm_zip = require("adm-zip");
const SSH_CLIENT = require("@ventose/ssh2").Client;
var dayjs = require("dayjs");
const subfix = dayjs().format(`YYYY-MM-DD_HH_mm_ss`);
const [configsName] = process.argv.slice(2);
const configs = ALL_CONFIGS[configsName];
const { _n } = require("../preprocess.utils.js");
console.log("🚀configs:\n", configs);

(async function main() {
	const pathD = _n.getPathD(__dirname);
	const dir = pathD(`./zips/${configsName}`);
	await _n.asyncSafeMakeDir(dir);
	const localZip = `${dir}/${configsName}_${subfix}.zip`;

	let sshClient = new SSH_CLIENT();
	/* 压缩文件夹 */
	console.log(await archiveFiles());
	sshClient.on("ready", onReady).connect(configs);

	async function onReady() {
		debugger;
		/* 清空目标服务器文件夹 */
		/* 上传压缩文件 */
		/* 解压 */
		console.log(await uploadZip());
	}

	async function archiveFiles() {
		var zip = new adm_zip();
		zip.addLocalFolder(pathD(`../..`, configs.localDir));
		zip.writeZip(localZip);
		return Promise.resolve("🚀archive done\n");
	}
	async function emptyRemoteDir() {
		return new Promise(resolve => {
			sshClient.sftp((err, sftp) => {
				if (err) throw err;
				sftp.fastPut(`${dir}/${AppName}.zip`, `/home/sopuser/${AppName}.zip`, err => {
					if (err) throw err;
					resolve("🚀upload done");
				});
			});
		});
	}

	async function uploadZip() {
		return new Promise(resolve => {
			sshClient.sftp((err, sftp) => {
				if (err) throw err;
				sftp.fastPut(localZip, configs.remoteZip, err => {
					if (err) throw err;
					resolve("🚀upload done");
				});
			});
		});
	}

	async function unzip() {
		return new Promise(resolve => {
			sshClient.sftp((err, sftp) => {
				if (err) throw err;
				sftp.fastPut(`${dir}/${AppName}.zip`, `/home/sopuser/${AppName}.zip`, err => {
					if (err) throw err;
					resolve("🚀unzip done");
				});
			});
		});
	}
})();
