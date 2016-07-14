<?php defined("ALT_PATH") OR exit("No direct script access allowed");

$dbo = new Playground_Application();

return $dbo->insert($_REQUEST);