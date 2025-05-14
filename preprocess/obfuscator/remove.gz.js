const { fs, path, _n } = require("../preprocess.utils");



(async () => {
    let [, diff_files] = await _n.asyncAllDirAndFile([path.resolve(__dirname, "../../static_vue2/common")]);
    _n.each(diff_files, async i => {
        const extname = path.extname(i);
        if (extname == ".gz") {
            fs.promises.unlink(i).then(() => {
                console.log("删除文件：", i);
            }).catch(e => {
                console.log("删除文件失败：", i, e);
            });
        }
    });

})();
