<?php if(!defined("__DIR__")) define("__DIR__", dirname(__FILE__));

define("DS", DIRECTORY_SEPARATOR);
define("ALT_PATH", __DIR__ . DIRECTORY_SEPARATOR);

ini_set('xdebug.show_exception_trace', 'Off');
error_reporting(E_ALL ^ E_NOTICE);
date_default_timezone_set("Asia/Jakarta");

require ALT_PATH . "engine" . DIRECTORY_SEPARATOR . "Alt.php";
spl_autoload_register(array("Alt", "autoload"));

// start application
Alt::test();