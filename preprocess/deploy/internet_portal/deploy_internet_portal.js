var fs = require("fs");
const { execCmd } = require("../../preprocess.utils");
const cheerio = require("cheerio");
var path = require("path");
var { _n } = require("@ventose/utils-node");
var dayjs = require("dayjs");
var adm_zip = require("adm-zip");
const { Client } = require("@ventose/ssh2");
const { compareZipFiles } = require("../compareZipFiles");
const { handle_common_libs, handle_ui_x } = require("../../obfuscator/uglify.libs.xui");
const subfix = dayjs().format(`YYYY-MM-DD_HH_mm_ss`);

const VERSION_NUM = subfix;

/* 大文件 */
const exclude_files = ["business_internet_portal/resources/images/banner2.gif",
    "business_internet_portal/resources/images/banner1.gif",
    "business_internet_portal/resources/images/banner4.gif",
    "business_internet_portal/resources/images/banner3.gif",
    "business_internet_portal/resources/images/banner3.jpg",
    "business_internet_portal/resources/images/banner.png",
    "business_internet_portal/resources/images/index-v3/solution/img_solve01.png",
    "business_internet_portal/help/helpimg/tjtxy.png",
    "business_internet_portal/resources/images/index-v3/solution/img_solve011.png",
    "business_internet_portal/resources/images/index-v3/solution/img_solve022.png",
    "business_internet_portal/resources/images/index-v3/solution/img_solve022_selected.png",
    "business_internet_portal/resources/images/index-v3/solution/img_solve011_selected.png",
    "business_internet_portal/resources/images/index-v3/solution/img_solve033.png",
    "business_internet_portal/image/client.jpg",
    // "business_internet_portal/image/client3.jpg",
    "business_internet_portal/resources/images/login.jpg",
    "business_internet_portal/resources/images/index-v3/solution/img_solve033_selected.png",
    "business_internet_portal/resources/images/banner4.png",
    "business_internet_portal/svg/selection.json",
    "business_internet_portal/help/helpimg/tjtxy1.png",
    "business_internet_portal/js/tiny2.all.js",
    // "business_internet_portal/image/client2.jpg",
    "business_internet_portal/resources/images/product/index/banner_product.png",
    "business_internet_portal/svg/fonts/icomoon.svg",
    "business_internet_portal/resources/images/banner2.jpg",
    "business_internet_portal/apply/js/echarts.min.js",
    "business_internet_portal/help/js/echarts.min.js",
    "business_internet_portal/resources/fonts/roboto/Roboto-Regular.svg",
    "business_internet_portal/resources/fonts/iconFont-product/iconFont-product.svg",
    "business_internet_portal/resources/images/banner1.jpg",
    "business_internet_portal/assets/svg/comsec-logo.png",
    // "business_internet_portal/image/comsec-logo.png",
    "business_internet_portal/resources/images/index-v3/news/new1.png",
    "business_internet_portal/resources/images/product/pg/arch4.jpg",
    "business_internet_portal/resources/images/product/pg/arch4.svg",
    "business_internet_portal/image/img2.png",
    "business_internet_portal/js/layer/theme/default/loading-4.gif",
    "business_internet_portal/apply/js/jquery-1.11.2.js",
    "business_internet_portal/help/js/jquery-1.11.2.js",
    "business_internet_portal/resources/images/common/poster.png",
    "business_internet_portal/help/svg/HTML CSS/fonts/ElegantIcons.svg",
    "business_internet_portal/image/1657184937083531162.svg",
    "business_internet_portal/resources/images/product/banner/sjkposter.png",
    "business_internet_portal/image/img1.png",
    "business_internet_portal/resources/images/product/banner/rqposter.png",
    "business_internet_portal/image/3.svg",
    "business_internet_portal/resources/fonts/iconFont-solution/iconFont-solution.svg",
    "business_internet_portal/svg/demo.html",
    "business_internet_portal/resources/images/product/banner/wlposter.png"
];




const CURRENT_PROJECT = "business_internet_portal";
const ZIP_DIRS = path.resolve(__dirname, `zips`);

const LATEST_ZIP_NAME = `${CURRENT_PROJECT}_LATEST.zip`;
const LATEST_ZIP_PATH = path.resolve(ZIP_DIRS, LATEST_ZIP_NAME);

const ZIP_NAME = `${CURRENT_PROJECT}_${subfix}`;
const ZIP_PATH = `${ZIP_DIRS}/${ZIP_NAME}.zip`;



async function archiveFiles(include_files = []) {
    const AdmZip = new adm_zip();
    const BUSINESS_FOLDER = path.resolve(__dirname, "../../../static_vue2");

    const all_file = [];
    const fnFilterFiles = path_name => {
        /* nodejs 14 没有replaceAll */
        path_name = String(path_name).split(path.sep).join("/");
        /* 大文件 */
        const index = exclude_files.indexOf(path_name);

        const reg = new RegExp(`^(${CURRENT_PROJECT}|common)`, "gi");
        const [projectNameString] = String(path_name).split(path.sep);
        const isInclude = reg.test(projectNameString);
        if (isInclude) {
            const state = fs.statSync(path.resolve(BUSINESS_FOLDER, path_name));
            const kb = Math.ceil(state.size / 1024);
            all_file.push({
                path_name,
                kb
            });


            if (include_files.length) {
                return include_files.includes(path_name);
            }

            if (index > -1) {
                return false;
            }
            // console.log("🚀 ", path_name, `${kb} kb`);
            return true;
        } else {
            return false;
        }
    };


    AdmZip.addLocalFolder(BUSINESS_FOLDER, "", fnFilterFiles);
    await _n.asyncSafeMakeDir(ZIP_DIRS);
    AdmZip.writeZip(ZIP_PATH);
    (async () => {
        const sorted_content = all_file.sort((a, b) => b.kb - a.kb).map(i => `${String(i.kb).padEnd(10, " ")}kb ${i.path_name}`).join("\n");
        await fs.promises.writeFile(`${ZIP_DIRS}/file_size_records.txt`, sorted_content);
    })();
    return Promise.resolve("archive done");
}


async function deploy(__ZIP_PATH, options = {}) {
    console.log("🚀 ~ deploy ~ __ZIP_PATH:", __ZIP_PATH, options);

    const { HOST_CONFIGS: _HOST_CONFIGS } = options;
    const { host, port } = _HOST_CONFIGS;

    return new Promise(async deploy_resolve => {

        const SSH_CLIENT = new Client();

        async function setup() {
            console.log("SSH_CLIENT : ready");

            function uploadZip() {
                return new Promise((upload_resolve, reject) => {
                    SSH_CLIENT.sftp((err, sftp) => {
                        if (err) throw err;
                        sftp.fastPut(
                            __ZIP_PATH,
                            `/data/portal_zips/${ZIP_NAME}.zip`,
                            err => {
                                if (err) {
                                    console.log("🚀 ~ conn.sftp ~ err:", err);
                                    reject(err);
                                } else {
                                    upload_resolve("upload done");
                                }
                            }
                        );
                    });
                });
            }

            function execCommand() {
                SSH_CLIENT.shell((err, stream) => {
                    if (err) throw err;

                    function downCount() {
                        console.log("DownCount: ", downCount.count--, `${host}:${port}`);
                        setTimeout(downCount, 1000);
                    }

                    downCount.count = 0;
                    downCount();

                    function StreamWrite(cmd) {
                        if (cmd) {
                            console.log(cmd);
                            stream.write(cmd);
                        }
                    }

                    function Close() {
                        if (Close.timer) {
                            clearTimeout(Close.timer);
                        }
                        /* 关闭倒计时 60s */
                        downCount.count = 60;

                        Close.timer = setTimeout(() => {
                            SSH_CLIENT.end();
                            process.exit(0);
                        }, 1000 * downCount.count);
                    }

                    let StreamDataCount = 0;
                    stream
                        .on("close", () => {
                            console.log("Stream :: close");
                            deploy_resolve();
                        })
                        .on("data", data => {
                            ++StreamDataCount;
                            const log = data.toString();
                            const SEP = `\n${StreamDataCount}=======================${host}:${port}=======\n`;
                            console.log(SEP, log, SEP);
                            if (/^\[root@host/.test(log) && 2 === StreamDataCount) {
                                StreamWrite(_HOST_CONFIGS.CMD_SCRIPT(ZIP_NAME));
                                // StreamWrite(`unzip -o -d /root/ghfe/download/business /root/ghfe/download/business/zips/${ZIP_NAME}.zip\n`);
                            }
                            Close();
                        });
                });
            }

            console.log(await uploadZip());
            if (options?.afterUploadZip) {
                options.afterUploadZip();
            }
            console.log(await execCommand());
        }

        SSH_CLIENT.on("ready", setup);
        SSH_CLIENT.connect(_HOST_CONFIGS);
    });

}


async function updateHtmlVersion(file_path) {
    const htmlString = await fs.promises.readFile(file_path, "utf-8");
    const $html = cheerio.load(htmlString);
    const version = $html("#src-root").attr("data-app-version");
    if (version) {
        $html("#src-root").attr("data-app-version", VERSION_NUM);
        const newHtmlContent = $html.html();
        await fs.promises.writeFile(file_path, newHtmlContent, "utf-8");
        console.log("update_html_version", file_path, VERSION_NUM);
    } else {
        console.log("update_html_version", file_path, "不需要缓存");
    }
}


const scan_new_and_deply = async HOST_CONFIGS_ARRAY => {

    const ROOT_DIR = path.resolve(__dirname, "../../..");
    const [, files] = await _n.asyncAllDirAndFile([path.resolve(ROOT_DIR, "static_vue2", CURRENT_PROJECT)]);

    const ALL_HTML = _n.filter(files, i => /.html$/.test(i));
    for await (const html of ALL_HTML) {
        await updateHtmlVersion(html);
    }
    await execCmd(`git add ${ROOT_DIR}${path.sep}*.html`);
    await execCmd(`git commit -m"deploy======================"`);
    await handle_common_libs();
    await handle_ui_x();

    /* 直接打包所有文件 */
    console.time("🚀 打包所有文件");
    await archiveFiles();
    console.timeEnd("🚀 打包所有文件");

    fs.copyFileSync(ZIP_PATH, LATEST_ZIP_PATH + ".backup");

    let all_diff_files = [];

    /* 检查是否存在最新的全量ZIP文件。 */
    const IS_LATEST_ZIP_FILE_EXISTS = fs.existsSync(LATEST_ZIP_PATH);

    if (IS_LATEST_ZIP_FILE_EXISTS) {
        /* 如果有最新ZIP文件，比较新旧ZIP文件，找出差异文件。 */
        all_diff_files = await compareZipFiles(
            ZIP_PATH,
            LATEST_ZIP_PATH,
        );
    }

    if (all_diff_files.length) {
        console.log("🚀 有变化的文件:\n\t\t", all_diff_files.join("\n\t\t").trimStart());
        /* 如果有变化的文件，就只需要压缩变化的文件 */
        console.time("🚀 只压缩有变化的文件");
        await archiveFiles(all_diff_files);
        console.timeEnd("🚀 只压缩有变化的文件");

    } else if (IS_LATEST_ZIP_FILE_EXISTS) {
        /* 如果后续的文件没变就删除压缩包，不用上传 */
        fs.unlinkSync(ZIP_PATH);
        return;
    }


    /* 初始上传（没有latest zip）| 有变化 */
    await Promise.all(HOST_CONFIGS_ARRAY.map(async (_HOST_CONFIGS) => deploy(ZIP_PATH, {
        HOST_CONFIGS: _HOST_CONFIGS,
    })));
    /* 上传成功之后 */
    /* 已经和最近的全量对比后，最新的全量文件作为最近的全量文件 */
    fs.copyFileSync(LATEST_ZIP_PATH + ".backup", LATEST_ZIP_PATH);
    console.log("已经和最近的全量对比后，最新的全量文件作为****_LATEST.zip用于下一次比较");
};

const [zip_path] = process.argv.slice(2);

const DEPLOY_CONFIGS = require("../../../../internet_portal_ssh_configs.js");


if (zip_path) {
    deploy(path.resolve(zip_path), { HOST_CONFIGS: DEPLOY_CONFIGS[21] });
    deploy(path.resolve(zip_path), { HOST_CONFIGS: DEPLOY_CONFIGS[23] });
} else {
    scan_new_and_deply([DEPLOY_CONFIGS[21], DEPLOY_CONFIGS[23]]);
}
