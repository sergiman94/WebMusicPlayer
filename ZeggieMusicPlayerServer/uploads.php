<?php

require_once './headers.php';
require_once 'libs/Pabhoz/MySQLiManager/MySQLiManager.php';

$db = new MySQLiManager('localhost','root','','AplicacionSuperCool');
$table = "songs";

if(isset($_GET["ejecute"])){
	if($_GET["ejecute"] != null && $_GET["ejecute"] != ""){
			switch ($_GET["ejecute"]){
				case "select":
					select();
                break;
                case "uploadsong":
					uploadsong();
                break;
			}
		}else{
			die("La función <b>".$_GET['ejecute']."</b> no existe");
		}
}

function select(){
    global $db,$table;

    $where = (isset($_GET["username"])) ? "username = '$_GET[username]'" : "";

    $fetch = $db->select("*",$table,$where);
    $fetch = ($fetch == NULL) ? [] : $fetch;
    print json_encode($fetch);	

}

function signUp(){
    global $db,$table;

    $data = $_POST;
    $data["id"] = "";

    $fetch = $db->insert($table,$data);
    print json_encode($fetch);
}

function uploadsong(){
    global $db,$table;

    // $data = $_POST;
    // $data["id"] = "";

    // $fetch = $db->insert($table,$data);
    // print json_encode($fetch);

    print_r($_FILES);
}

