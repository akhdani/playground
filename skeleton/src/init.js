if (window.require) {
    require("./renderer.js");

    // handle node's require and requirejs
    window.nodeRequire = window.require;
    delete window.require;

    // load jquery
    window.$ = window.jQuery = window.nodeRequire('./asset/lib/jquery/dist/jquery.js');

    // load electron
    window.electron = window.nodeRequire("electron");

    // open external link to new browser
    var shell = window.electron.shell;
    $(document).on('click', 'a[href^="http"]', function(event) {
        event.preventDefault();
        shell.openExternal(this.href);
    });
}