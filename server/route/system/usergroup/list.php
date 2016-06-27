<?php defined("ALT_PATH") OR exit("No direct script access allowed");

System_Auth::set_permission(1);

$_REQUEST['isdisplayed'] = 1;

$dbo = new System_Usergroup;
$res = $dbo->get($_REQUEST);

return $res;