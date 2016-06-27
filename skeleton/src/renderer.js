const fs = require("fs");
const path = require("path");
const copyDir = require("copy-dir");

// global prototyper object
window.Prototyper = {
    path: "/apps/",
    location: __dirname.indexOf("\\resources\\app.asar") > 0 ? __dirname.split("\\resources\\app.asar")[0] : __dirname.split("\\src")[0],

    // get application list
    list: function(){
        var res = [],
            list = fs.readdirSync(Prototyper.location + Prototyper.path).filter(function(file) {
                return fs.statSync(path.join(Prototyper.location + Prototyper.path, file)).isDirectory();
            });

        var bower;
        angular.forEach(list, function(val, key){
            bower = angular.fromJson(fs.readFileSync(Prototyper.location + Prototyper.path + val + "/bower.json", "utf-8"));

            res.push({
                "name": bower.name,
                "title": bower.title,
                "description": bower.description,
                "screenshot": "file://" + Prototyper.location + Prototyper.path + bower.name + "/screenshot.jpg?" + (+new Date())
            });
        });

        return res;
    },

    // retrieve application
    retrieve: function(app){
        app.name = (app.name + '').toLowerCase();

        var location = Prototyper.location + Prototyper.path + app.name,
            bower = angular.fromJson(fs.readFileSync(location + "/bower.json", "utf-8")),
            res = {
                name: bower.name,
                title: bower.title,
                description: bower.description,
                saved: true,
                pages: []
            };

        var walk = function(dir) {
            var results = [],
                dirs = [],
                list = fs.readdirSync(dir);

            list.forEach(function(file) {
                file = dir + "\\" + file;

                var stat = fs.statSync(file),
                    route = dir.split("route\\").length > 1 ? (dir.split("route\\")[1] + "").split("\\").join("/") : "";

                if (stat && stat.isDirectory()){
                    results = results.concat(walk(file));
                }else if((file.indexOf("controller.js") >= 0 || file.indexOf("view.html")) && dir.split("route\\").length > 1 && dirs.indexOf(route) == -1){
                    dirs.push(route);
                    results.push({
                        route: route,
                        controller: fs.readFileSync(dir + "/controller.js", "utf-8"),
                        view: fs.readFileSync(dir + "/view.html", "utf-8")
                    });
                }
            });
            return results;
        };

        res.pages = walk(location + "/route");

        return res;
    },

    // save application
    save: function(app){
        app.name = (app.name + "").toLowerCase();

        var location = Prototyper.location + Prototyper.path + app.name;
        if(!app.saved){
            if(fs.existsSync(location))
                throw Error("There is already application with name " + app.name + "!");

            // create directory
            fs.mkdirSync(location);

            // copy initial files from resources
            copyDir.sync(Prototyper.location + Prototyper.path + "skeleton/", location);

            // write initial config.js
            fs.writeFileSync(location + "/config.js",
                `alt.application = "${app.name}";\r\n` +
                `alt.title = "${app.title}";\r\n` +
                `alt.description = "${app.description}";\r\n\r\n` +
                `alt.config([\"$compileProvider\", function($compileProvider) {\r\n` +
                `    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|ftp|mailto|chrome-extension):/);\r\n` +
                `}]);`
            );
        }

        // update bower.json
        var bower = angular.fromJson(fs.readFileSync(location + "/bower.json", "utf-8"));
        bower.name = app.name;
        bower.title = app.title;
        bower.description = app.description;
        fs.writeFileSync(location + "/bower.json", angular.toJson(bower));

        // update screenshot if exist
        if(app.screenshot)
            fs.createReadStream(app.screenshot.path).pipe(fs.createWriteStream(location + "/screenshot.jpg"));
    },

    // launch application
    launch: function(app, route){
        const {BrowserWindow} = window.electron.remote;

        let win = new BrowserWindow({
            width: 1024,
            height: 600,
            minWidth: 800,
            minHeight: 600,
            // frame: false,
            // fullscreen: true,
            // kiosk: true,
            titleBarStyle: "hidden",
            center: true,
            title: app.title.substr(0, 1).toUpperCase() + app.title.substr(1),
            icon: `${__dirname}/favicon.ico`
        });

        win.setMenu(null);
        win.maximize();
        win.openDevTools();
        win.on("closed", function(){
            win = null;
        });

        var tmp = __dirname.indexOf("\\resources\\app.asar") > 0 ? __dirname.split("\\resources\\app.asar") : __dirname.split("\\src"),
            location = tmp[0];

        win.loadURL("file://" + location + Prototyper.path + app.name + "/index.html" + (route ? alt.baseUrl + route : ""));
    },

    // remove application
    remove: function(app){
        var deleteFolderRecursive = function(path) {
            if( fs.existsSync(path) ) {
                fs.readdirSync(path).forEach(function(file,index){
                    var curPath = path + "/" + file;
                    if(fs.lstatSync(curPath).isDirectory()) { // recurse
                        deleteFolderRecursive(curPath);
                    } else { // delete file
                        fs.unlinkSync(curPath);
                    }
                });
                fs.rmdirSync(path);
            }
        };

        deleteFolderRecursive(Prototyper.location + Prototyper.path + app.name);
    },

    // application page
    page: {
        // create page
        create: function(app, route){
            var location = Prototyper.location + Prototyper.path + app + "/route/" + route;

            function mkdir(path, root) {
                var dirs = path.split('/'),
                    dir = dirs.shift(),
                    root = (root || '') + dir + '/';

                try {
                    fs.mkdirSync(root);
                }catch (e) {
                    //dir wasn't made, something went wrong
                    if(!fs.statSync(root).isDirectory()) throw new Error(e);
                }

                return !dirs.length || mkdir(dirs.join('/'), root);
            }

            // create directory if not exist
            if(fs.existsSync(location + "/controller.js"))
                throw new Error("There is already that page in application!");

            // create recursive directories needed
            mkdir(location);

            // copy initial files from resources
            copyDir.sync(Prototyper.location + Prototyper.path + "skeleton/route/skeleton", location);
        },

        // retrieve page files
        retrieve: function(app, route){
            app = (app + '').toLowerCase();
            route = (route + '').toLowerCase();

            return {
                route: route,
                controller: fs.readFileSync(Prototyper.location + Prototyper.path + app + "/route/" + route + "/controller.js", "utf-8"),
                view: fs.readFileSync(Prototyper.location + Prototyper.path + app + "/route/" + route + "/view.html", "utf-8")
            };
        },

        // save page files
        save: function(app, route, controller, view){
            app = (app + '').toLowerCase();
            route = (route + '').toLowerCase();

            fs.writeFileSync(Prototyper.location + Prototyper.path + app + "/route/" + route + "/controller.js", controller);
            fs.writeFileSync(Prototyper.location + Prototyper.path + app + "/route/" + route + "/view.html", view);
        },

        // remove page
        remove: function(app, route){
            var deleteFolderRecursive = function(path) {
                if( fs.existsSync(path) ) {
                    fs.readdirSync(path).forEach(function(file,index){
                        var curPath = path + "/" + file;
                        if(fs.lstatSync(curPath).isDirectory()) { // recurse
                            deleteFolderRecursive(curPath);
                        } else { // delete file
                            fs.unlinkSync(curPath);
                        }
                    });
                    fs.rmdirSync(path);
                }
            };

            deleteFolderRecursive(Prototyper.location + Prototyper.path + app + "/route/" + route);
        }
    }
};

