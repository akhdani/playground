<?php defined("ALT_PATH") or die("No direct script access.");

class System_User extends Alt_Dbo {

    public function __construct() {
        // call parent constructor
        parent::__construct();

        // define this class specific properties
        $this->pkey         = "userid";
        $this->table_name   = "sys_user";
        $this->table_fields = array(
            "userid"            => "",
            "username"          => "",
            "password"          => "",
            "name"              => "",
            "address"           => "",
            "email"             => "",
            "phone"             => "",
            "usergroupid"       => "",
            "isenabled"         => "",
            "facebook"          => "",
        );
    }

    public function retrieve($data, $returnsql = false){
        Alt_Validation::instance()
            ->rule(Alt_Validation::required($data["userid"]), "User tidak dipilih!")
            ->check();

        $user = parent::retrieve($data, $returnsql);
        if($returnsql)
            return $user;

        $dbo_usergroup = new System_Usergroup();
        $usergroup = $dbo_usergroup->retrieve(array(
            "select" => "name, level",
            "usergroupid" => $user["usergroupid"],
        ));

        $user["usergroupname"] = $usergroup["name"];
        $user["userlevel"] = $usergroup["level"];

        return $user;
    }

    public function get($data = array(), $returnsql = false) {
        $list = parent::get($data, $returnsql);
        if($returnsql)
            return $list;

        $dbo_usergroup = new System_Usergroup();
        $ref_usergroup = $dbo_usergroup->keyvalues(array(
            "key" => "usergroupid",
            "select" => "name, level"
        ));

        foreach($list as $i => $item){
            $list[$i]["usergroupname"] = $ref_usergroup[$item["usergroupid"]]["name"];
            $list[$i]["userlevel"] = $ref_usergroup[$item["usergroupid"]]["level"];
        }

        return $list;
    }
}