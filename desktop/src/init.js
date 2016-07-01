(function(){
    if (!window.require)
        return;

    // handle node's require and requirejs
    window.nodeRequire = window.require;
    delete window.require;

    // load electron
    window.electron = window.nodeRequire("electron");

    // load jquery
    window.$ = window.jQuery = window.nodeRequire(electron.remote.getGlobal("app_path") + "resources/app.asar/app/asset/lib/jquery/dist/jquery.js");

    // open external link to new browser
    var shell = window.electron.shell;
    $(document).on("click", "a[href^=\"http\"]", function(event) {
        event.preventDefault();
        shell.openExternal(this.href);
    });
})();