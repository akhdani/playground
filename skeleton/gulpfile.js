var gulp = require("gulp"),
    bower = require("gulp-bower"),
    css = require("gulp-clean-css"),
    html = require("gulp-htmlmin"),
    obfuscate = require("gulp-js-obfuscator");

// Register tasks
gulp.task("bower", function(){
    return bower("src/asset/lib");
});

gulp.task("asset", function() {
    return gulp.src(["src/**/*"])
        .pipe(gulp.dest("app"))
        .pipe(gulp.dest("www"));
});

gulp.task("css-min", function() {
    return gulp.src(["src/**/*.css", "!src/node_modules/**/*"])
        .pipe(css({compatibility: "ie8"}))
        .pipe(gulp.dest("app"))
        .pipe(gulp.dest("www"));
});

gulp.task("html-min", function() {
    return gulp.src(["src/**/*.html", "!src/node_modules/**/*"])
        .pipe(html({collapseWhitespace: true}))
        .pipe(gulp.dest("app"))
        .pipe(gulp.dest("www"));
});

gulp.task("js-library", function() {
    return gulp.src(["src/asset/js/*.js"])
        .pipe(obfuscate({}))
        .pipe(gulp.dest("app/asset/js"))
        .pipe(gulp.dest("www/asset/js"));
});

gulp.task("js-component", function() {
    return gulp.src(["src/component/**/*.js"])
        .pipe(obfuscate({}))
        .pipe(gulp.dest("app/component"))
        .pipe(gulp.dest("www/component"));
});

gulp.task("js-route", function() {
    return gulp.src(["src/route/**/*.js"])
        .pipe(obfuscate({}))
        .pipe(gulp.dest("app/route"))
        .pipe(gulp.dest("www/route"));
});

gulp.task("js-config", function() {
    return gulp.src(["src/config.js"])
        .pipe(obfuscate({}))
        .pipe(gulp.dest("app"))
        .pipe(gulp.dest("www"));
});

gulp.task("js-electron", function() {
    return gulp.src(["src/electron.js"])
        .pipe(obfuscate({}))
        .pipe(gulp.dest("app"))
        .pipe(gulp.dest("www"));
});

var electron = require("electron-connect").server.create({path: "./src"});

gulp.task("serve", function () {
    // Start browser process
    electron.start();

    // Restart browser process
    gulp.watch("src/desktop.js", electron.restart);

    // Reload renderer process
    gulp.watch("src/**/*", electron.reload);
});

gulp.task("update", ["css-min", "html-min", "js-library", "js-config", "js-component", "js-route", "js-electron"]);
gulp.task("compile", ["asset", "update"]);
