// initialize electron app
const path = require("path");
const {app, Menu, Tray, BrowserWindow} = require("electron");
const pkg = require("./package.json");
const app_path = app.getPath("exe").replace(pkg.name.charAt(0).toUpperCase() + pkg.name.substr(1) + ".exe", "");
const fs = require("fs");

let mainWindow = null;

app.setPath("userData", app_path + "/data");
global.path = {
    folder: app_path,
    resources: app_path + "resources/",
    asar: app_path + "resources/app.asar/app/"
};

function createWindow () {
    if (mainWindow !== null) return;

    mainWindow = new BrowserWindow({
        width: 1366,
        height: 728,
        minWidth: 1366,
        minHeight: 728,
        // frame: false,
        // fullscreen: true,
        // kiosk: true,
        titleBarStyle: "hidden",
        center: true,
        title: pkg.name.substr(0, 1).toUpperCase() + pkg.name.substr(1),
        icon: `${__dirname}/favicon.ico`
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    // additional window configuration
    mainWindow.setMenu(null);
    mainWindow.maximize();
    mainWindow.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on("closed", function () {
        mainWindow = null;
    });
}

app.on("ready", function(){
    createWindow();
});

app.on("window-all-closed", function () {
    if (process.platform !== "darwin")
        app.quit();
});

app.on("activate", function () {
    createWindow();
});

process.on('uncaughtException', function (error) {

});