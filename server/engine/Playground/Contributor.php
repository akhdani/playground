<?php defined("ALT_PATH") OR exit("No direct script access allowed");

class Playground_Contributor extends Alt_Dbo {

    public function __construct(){
        // call parent constructor
        parent::__construct();

        // define this class specific properties
        $this->pkey         = "contributorid";
        $this->table_name   = "play_contributor";
        $this->table_fields = array(
            "contributorid" => "",
            "applicationid" => "",
            "userid"        => "",
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