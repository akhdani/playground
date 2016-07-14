<?php defined("ALT_PATH") OR exit("No direct script access allowed");

Alt_Validation::instance()
    ->rule(Alt_Validation::required($_REQUEST["code"]), "Kode aplikasi belum diisi!")
    ->check();

$dbo = new Playground_Application();
$app = $dbo->retrieve(array(
    "where" => "code = " . $dbo->quote($_REQUEST["code"])
));

// increase counter
$app["counter"] += 1;
$dbo->update($app);

// prepare to download
$file = "static" . DS . $app["code"] . DS . $app["version"] . DS . "app.asar";
if(!file_exists($file))
    throw new Alt_Exception("File tidak ditemukan!");

header("Content-Type: application/octet-stream");
header("Content-Disposition: attachment; filename=\"" . $app["code"] . ".asar\"");
header("Content-Length: " . filesize($file));
$data = readfile($file);
exit($data);