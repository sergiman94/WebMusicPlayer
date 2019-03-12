<?php

require_once './headers.php';
require_once 'libs/Pabhoz/MySQLiManager/MySQLiManager.php';

$db = new MySQLiManager('localhost','root','','AplicacionSuperCool'); // conexion a bd 
$table = "songs"; // tabla de consulta

if(isset($_GET["ejecute"])){
    // y ejecute no esta vacia
	if($_GET["ejecute"] != null && $_GET["ejecute"] != ""){
        // si algun caso se encuentra en la variable ejecute, se ejecuta
			switch ($_GET["ejecute"]){
				case "select":
					select();
                break;
                case "insert":
                    insert();
                break;
                case "playlistsongs":
                    getPlaylistsSongs();
                break;
                case "selectplaylist":
                    selectPlaylist();
                break;
			}
		}else{
			die("La función <b>".$_GET['ejecute']."</b> no existe");
		}
}

function select(){
    
    global $db,$table;

    // si existe en la bd username, la variable username sera el username de la bd
    $where = (isset($_GET["title"])) ? "title = '$_GET[title]'" : "";

    // seleccionamos ese usuario en la tabla users
    $fetch = $db->select("*",$table,$where);
    // si lo que obtenemos(fetch) es nulo, retorna un arreglo vacio, de lo contrario retorna el mismo
    $fetch = ($fetch == NULL) ? [] : $fetch;

    echo json_encode($fetch);	

}

function insert(){

    global $db,$table;

    // data es el metodo de peticion al servidor
    $data = $_POST;

    // el id de la bd sera vacia("autoincrementa")
    $data["id"] = "";

    // insertamos ese id en la bd 
    $fetch = $db->insert($table,$data);

    $fetch = ($fetch == NULL) ? [] : $fetch;

    print_r($_POST);

    print json_encode($fetch);

}

function selectPlaylist(){
    
    global $db,$table;

    // si existe en la bd username, la variable username sera el username de la bd
    $where = (isset($_GET["id"])) ? "id = '$_GET[id]'" : "";

    // seleccionamos ese usuario en la tabla users
    $fetch = $db->select("*","playlists",$where);
    // si lo que obtenemos(fetch) es nulo, retorna un arreglo vacio, de lo contrario retorna el mismo
    $fetch = ($fetch == NULL) ? [] : $fetch;

    echo json_encode($fetch);	

}

function getPlaylistsSongs(){
    global $db,$table;

    $where =  "playlists_id = '$_GET[playlists_id]'";

    $songsid = $db->select("songs_id","playlists_has_songs","playlists_id = $where");

    echo json_encode($songsid);

}