<?php defined("ALT_PATH") OR die("No direct access allowed.");

return array (
    "app" => array(
        "id" => "playground",
        "name" => "Playground Server",
        "environment" => "development",
//        "environment" => "production",
    ),
    "log" => array(
        "level" => 5,
    ),
    "session" => array(
        "lifetime" => 43200,
    ),
    "security" => array(
        "algorithm" => MCRYPT_RIJNDAEL_128,
        "mode" => MCRYPT_MODE_CBC,
        "key" => "d2hlcmVpZGVhY3Jl",
        "iv" => "JlYXRlZAcGxheWdyb3VuZA==",
    ),
    "database" => array(
        "default" => array (
            "type"       => "Mysql",
            "charset"    => "utf8",
            "connection" => array(
                "host"       => "localhost",
                "database"   => "playground",
                "username"   => "root",
                "password"   => "w2e3r4",
                "persistent" => FALSE,
            ),
        )
    ),
);