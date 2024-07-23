const { spawn } = require('child_process');
const path = require("path");

if (process.stdin.setRawMode) {
    process.stdin.setRawMode(true);
}
function runServer() {
    const child = spawn("node", [path.resolve(__dirname, './server.js')]);
    child.stdout.on('data', (data) => {
        console.log(`🚀🚀🚀🚀${data}`);
    });

    child.stderr.on('data', (data) => {
        console.error(`🚀🚀🚀🚀${data}`);
    });
    child.on('exit', function (code, signal) {
        console.log('🚀🚀🚀🚀child process exited with ' + `code ${code} and signal ${signal}`);
    });
    return child;
}


try {
    let childProcess;
    console.log("🚀🚀R、r、ctrl + r => reload app");
    console.log("🚀🚀ctrl + c => exit app");

    process.stdin.on('data', async (chunk) => {
        let keys = [];
        for (let index = 0; index < chunk.byteLength; index++) {
            const val = chunk[index];
            if (Number.isInteger(val)) {
                keys.push(val);
            }
        }
        let keyName = chunk.toString();

        if (keyName === "\u0003") {
            /* ctrl + c */
            if (childProcess?.exit) {
                childProcess.exit(0);
            }
            process.exit(0);
        }

        if (["\u0012", "r", "R"].includes(keyName)) {
            /* ctrl + r */
            if (childProcess?.exit) {
                childProcess.exit(0);
            }
            childProcess = runServer();
        }
    });

    process.on('exit', function (code, signal) {
        console.log('🚀🚀process exited with ' + `code ${code} and signal ${signal}`);
    });

    childProcess = runServer();


} catch (error) {
    console.log("🚀🚀error:", error);
}

