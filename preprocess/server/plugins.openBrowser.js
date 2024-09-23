'use strict';
const { promisify } = require('util');
const path = require('path');
const { exec } = require("child_process");
const asyncExec = promisify(exec);

exports.openBrowser = async (target, options) => {
    if (typeof target !== 'string') {
        throw new TypeError('Expected a `target`');
    }

    options = {
        wait: false,
        ...options
    };

    let command;
    let appArguments = [];
    const cliArguments = [];
    const childProcessOptions = {};

    if (Array.isArray(options.app)) {
        appArguments = options.app.slice(1);
        options.app = options.app[0];
    }

    if (process.platform === 'darwin') {
        command = 'open';

        if (options.wait) {
            cliArguments.push('-W');
        }

        if (options.app) {
            cliArguments.push('-a', options.app);
        }
    } else if (process.platform === 'win32') {
        command = 'cmd.exe';
        cliArguments.push('/c', 'start', '""', '/b');
        target = target.replace(/&/g, '^&');

        if (options.wait) {
            cliArguments.push('/wait');
        }

        if (options.app) {
            cliArguments.push(options.app);
        }

        if (appArguments.length > 0) {
            cliArguments.push(...appArguments);
        }
    } else {
        if (options.app) {
            command = options.app;
        } else {
            const useSystemXdgOpen = process.versions.electron || process.platform === 'android';
            command = useSystemXdgOpen ? 'xdg-open' : path.join(__dirname, 'xdg-open');
        }

        if (appArguments.length > 0) {
            cliArguments.push(...appArguments);
        }

        if (!options.wait) {
            // `xdg-open` will block the process unless stdio is ignored
            // and it's detached from the parent even if it's unref'd.
            childProcessOptions.stdio = 'ignore';
            childProcessOptions.detached = true;
        }
    }

    cliArguments.push(target);

    if (process.platform === 'darwin' && appArguments.length > 0) {
        cliArguments.push('--args', ...appArguments);
    }

    try {
        await asyncExec([command, ...cliArguments].join(" "));
    } catch (error) {
        console.error(error);
    }

};
