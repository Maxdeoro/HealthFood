<?php
$_POST = json_decode(file_get_contents("php://input"), true);	//декодирование данных JSON для php
echo var_dump($_POST);		//to receive response from server