const { readFileSync } = require('fs');

const { Client } = require('ssh2');

const conn = new Client();
debugger;
conn.on('ready', () => {
    debugger;
    console.log('Client :: ready');
    conn.exec('uptime', (err, stream) => {
        if (err) throw err;
        stream.on('close', (code, signal) => {
            console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
            conn.end();
        }).on('data', (data) => {
            console.log('STDOUT: ' + data);
        }).stderr.on('data', (data) => {
            console.log('STDERR: ' + data);
        });
    });
}).connect({
    host: "10.143.133.216",
    port: "22",
    username: "root",
    password: "Pbu4@123",
});