<?php defined("ALT_PATH") OR exit("No direct script access allowed");

class Playground_Version extends Alt_Dbo {

    public function __construct(){
        // call parent constructor
        parent::__construct();

        // define this class specific properties
        $this->pkey         = "versionid";
        $this->table_name   = "play_version";
        $this->table_fields = array(
            "versionid"     => "",
            "applicationid" => "",
            "version"       => "",
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