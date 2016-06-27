<?php defined("ALT_PATH") OR exit("No direct script access allowed");

System_Auth::set_permission(0);

$dbo = new System_User();

// validasi
Alt_Validation::instance()
    ->rule(Alt_Validation::required($_REQUEST[$dbo->pkey]), "Pilih user terlebih dahulu!")
    ->check();

$res = $dbo->retrieve($_REQUEST);
unset($res['password']);

return $res;