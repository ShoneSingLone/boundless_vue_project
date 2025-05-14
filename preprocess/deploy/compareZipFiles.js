const adm_zip = require("adm-zip");
const crypto = require("crypto");

function getFileHash(buffer) {
    return crypto.createHash("md5").update(buffer).digest("hex");
}

async function compareZipFiles(zipPath1, zipPath2) {

    const zip1 = new adm_zip(zipPath1);
    const zip2 = new adm_zip(zipPath2);

    const zip1Entries = zip1.getEntries();
    const zip2Entries = zip2.getEntries();

    const zip1Map = new Map(zip1Entries.map(entry => [entry.entryName, entry]));
    const zip2Map = new Map(zip2Entries.map(entry => [entry.entryName, entry]));

    const allEntries = new Set([...zip1Map.keys(), ...zip2Map.keys()]);
    const diffEntries = [];

    for (const entryName of allEntries) {
        const entry1 = zip1Map.get(entryName);
        const entry2 = zip2Map.get(entryName);

        if (!entry1 || !entry2) {
            diffEntries.push(entryName);
        } else {
            const content1 = entry1.getData();
            const content2 = entry2.getData();
            const content1Hash = getFileHash(content1);
            const content2Hash = getFileHash(content2);
            if (content1Hash !== content2Hash) {
                console.log("🚀 ~ compareZipFiles ~ diff: ", entryName, content1Hash, content2Hash);
                diffEntries.push(entryName);
            }
        }
    }

    return diffEntries;
}

module.exports = { compareZipFiles };
