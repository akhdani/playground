<?php defined("ALT_PATH") OR exit("No direct script access allowed");

class Playground_Application extends Alt_Dbo {

    public function __construct(){
        // call parent constructor
        parent::__construct();

        // define this class specific properties
        $this->pkey         = "applicationid";
        $this->table_name   = "play_application";
        $this->table_fields = array(
            "applicationid" => "",
            "name"          => "",
            "description"   => "",
            "url"           => "",
            "entrytime"     => "",
            "entryuser"     => "",
            "modifiedtime"  => "",
            "modifieduser"  => "",
            "deletedtime"   => "",
            "deleteduser"   => "",
            "isdeleted"     => 0
        );
    }
}