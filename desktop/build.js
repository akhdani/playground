"use strict";

require("shelljs/global");
const ncp = require("ncp");
const packager = require("electron-packager");
const pkg = require("./package.json");
const devDeps = Object.keys(pkg.devDependencies);

const DEFAULT_OPTS = {
    dir:   "./",
    name:  pkg.name.substr(0, 1).toUpperCase() + pkg.name.substr(1),
    asar:  true,
    prune: true,
    out:   "build/v" + pkg.version,
    "app-version": pkg.version,
    ignore: [
        ".bowerrc",
        ".editorconfig",
        ".gitignore",
        "bower.json",
        "build.js",
        "config.xml",
        "gulpfile.js",
        "ionic.project",
        "/build($|/)",
        "/src($|/)",
        "/www($|/)",
        "/resources($|/)",
    ].concat(devDeps.map(name => `/node_modules/${name}($|/)`))
};

const pack = function(platform, arch, callback) {
    const iconObj = {
        icon: "src/favicon" + (function() {
            let extension = ".png";
            if (platform === "darwin") {
                extension = ".icns";
            } else if (platform === "win32") {
                extension = ".ico";
            }
            return extension;
        })()
    };

    const opts = Object.assign({}, DEFAULT_OPTS, iconObj, { platform, arch });
    packager(opts, (err, filepath) => {
        if (err) return console.error(err);
    });
};

exec("rd /s /q build\\v" + pkg.version);
// pack("darwin", "x64");
// pack("linux",  "ia32");
// pack("linux",  "x64");
pack("win32",  "ia32");
pack("win32",  "x64");
