<?php
	$numerocaras=$_REQUEST["numcaras"];
	$numerovertices=$_REQUEST["numvertices"];
	$numeroaristas=$numerocaras+$numerovertices-2;
    echo $numeroaristas;
?>
