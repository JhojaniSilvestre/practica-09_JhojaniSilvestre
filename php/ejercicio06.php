<?php
    $entrada=fopen('php://input','r');
    $datos= fgets($entrada);
    $datos= json_decode($datos,true);    

	$resultado=new stdClass();
	$resultado->Velocidad = $datos['Velocidad'];
	$resultado->Rozamiento= $datos['Rozamiento'];
	$resultado->Distancia=0;
		
    $resultado->Distancia=round((pow($resultado->Velocidad,2)/(9.8 * 2 * $resultado->Rozamiento)),2);
    $respuesta=json_encode($resultado);
    echo$respuesta;
?>
 