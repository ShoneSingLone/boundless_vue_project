const { _n } = require("@ventose/utils-node");
const path = require("path");
const fs = require("fs");

async function main(params) {
    const [, files] = await _n.asyncAllDirAndFile([
        path.resolve(__dirname, "../static_vue2")
    ]);
    _n.each(files, async i => {
        if (path.extname(i) === ".vue") {
            const content = fs.readFileSync(i, "utf-8");
            if (/debugger/.test(content)) {
                const newContent = content.replace(/debugger;?/g, "");
                fs.writeFileSync(i, newContent, "utf-8");
            }
        }
    });
}

main();
