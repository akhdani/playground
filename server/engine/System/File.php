<?php defined("ALT_PATH") OR exit("No direct script access allowed");

class System_File extends Alt_Dbo {

    public function __construct(){
        // call parent constructor
        parent::__construct();

        // define this class specific properties
        $this->pkey         = "fileid";
        $this->table_name   = "sys_file";
        $this->table_fields = array(
            "fileid"        => "",
            "srctable"      => "",
            "srcid"         => "",
            "location"      => "",
            "name"          => "",
            "description"   => "",
            "mime"          => "",
            "entrytime"     => "",
            "entryuser"     => "",
            "isdeleted"     => 0
        );
    }

    public function insert($data, $isreturnsql = false){
        Alt_Validation::instance()
            ->rule(Alt_Validation::required($data["srctable"]), "Nama belum diisi!")
            ->rule(Alt_Validation::required($data["srcid"]), "Nama belum diisi!")
            ->rule(Alt_Validation::required($_FILES["file"]), "File belum dipilih!")
            ->check();

        $data["fileid"] = parent::insert($data, $isreturnsql);
        if($isreturnsql)
            return $data["fileid"];

        return $this->upload($data, $_FILES["file"]);
    }

    public function upload($data, $file){
        if ($file["error"] > 0)
            throw new Exception("File error : " . $file["error"], -1);

        $uploads_dir = "static" . DIRECTORY_SEPARATOR . $data["srctable"] . DIRECTORY_SEPARATOR . $data["srcid"] .
            DIRECTORY_SEPARATOR;
        @mkdir($uploads_dir, 1777, true);
        @move_uploaded_file($file["tmp_name"], $uploads_dir . $file["name"]);

        $data["location"] = $uploads_dir . $file["name"];
        $data["mime"] = $file["type"];
        parent::update($data);

        return $data["fileid"];
    }
}