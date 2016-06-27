<?php defined("ALT_PATH") OR exit("No direct script access allowed");

System_Auth::set_permission(0);

if(!System_Auth::islogin() && System_Auth::get_token() == '')
    throw new Alt_Exception('Anda belum login atau sesi anda telah habis');

$userdata = System_Auth::get_userdata();

$dbo = new System_Session();
$res = $dbo->delete(array(
    'where' => 'userid = ' . $dbo->quote($userdata['userid']) . ' and token like ' . $dbo->quote(System_Auth::get_token())
));

System_Auth::clear_token();

return $res;