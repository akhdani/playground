// initialize electron app
const {app, Menu, Tray, BrowserWindow} = require("electron");
const pkg = require("./package.json");
let client = require("electron-connect").client;

let mainWindow = null;

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

    // Connect to server process
    client.create(mainWindow);

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