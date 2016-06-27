<?php defined("ALT_PATH") OR die("No direct access allowed.");

class Fluido {

    /**
     * Deploy from bpmn file, parse xml and save to master database
     * @param $data
     * @return int $deploymentid
     * @throws Alt_Exception
     */
    public function deploy($data){
        $data["vendor"] = $data["vendor"] ? $data["vendor"] : "activiti";

        // validate
        Alt_Validation::instance()
            ->rule(Alt_Validation::required($data["bpmn"]), "File bpmn belum diupload!")
            ->rule(Alt_Validation::required($data["name"]), "Nama belum diisi!")
            ->rule(Alt_Validation::required($data["vendor"]), "Vendor belum diisi!")
            ->check();

        // check parser exist
        $class = "Fluido_Parser_" . ucfirst($data["vendor"]);
        if(!class_exists($class))
            throw new Alt_Exception("BPMN Parser untuk vendor " . ucfirst($data["vendor"]) . " tidak ditemukan!");

        // transaction
        $db = Alt_Db::instance();
        $db->begin();

        try{
            // insert to deployment
            $mst_deployment = new Fluido_Master_Deployment();
            $data["deploymentid"] = $mst_deployment->insert($data);

            /** @var Fluido_Parser */
            $parser = new $class($data);

            // parse bpmn
            $parser->parse();

            $db->commit();
        }catch(Exception $e){
            $db->rollback();

            throw (($e instanceof Alt_Exception) ? $e : new Alt_Exception("Tidak dapat melakukan parsing bpmn!"));
        }

        return $data["deploymentid"];
    }
}