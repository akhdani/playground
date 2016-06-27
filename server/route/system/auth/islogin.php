<?php defined("ALT_PATH") OR exit("No direct script access allowed");

System_Auth::set_permission(0);

return System_Auth::islogin();