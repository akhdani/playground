<?php defined("ALT_PATH") or die("No direct script access.");

class System_Session extends Alt_Dbo {

    public function __construct() {
        // call parent constructor
        parent::__construct();

        // define this class specific properties
        $this->pkey         = "";
        $this->table_name   = "sys_session";
        $this->table_fields = array(
            "userid"        => "",
            "token"         => "",
        );
        $this->autoinc = false;
    }
}