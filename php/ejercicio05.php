<?php
    $entrada=fopen('php://input','r');
    $dato=fgets($entrada);
    $valor=simplexml_load_string($dato);
    $valora=$valor->segundo[0]->a;
    $valorb=$valor->segundo[0]->b;
    $valorc=$valor->segundo[0]->c;
	
	
	$cuadradob=pow($valorb,2);
	$resto= 4 * $valora * $valorc;
	$dentro=$cuadradob - $resto;
	if ($dentro < 0){
		$raiz=round(sqrt(abs($dentro)),2);
	} else {
		$raiz=round(sqrt($dentro),2);
	}
	$resul1 = round((( -$valorb + $raiz) / ( 2 * $valora)),2);
	$resul2 = round((( -$valorb - $raiz) / ( 2 * $valora)),2);
	if ($dentro < 0){
		$resul1=(-$valorb/( 2 * $valora)).'+'.($raiz / ( 2 * $valora)).'i';
		$resul2=(-$valorb/( 2 * $valora)).'-'.($raiz / ( 2 * $valora)).'i';
	}
    header('Content-Type:text/xml');
    $final='<ecuacion><segundo ><a>'.$valora.'</a><b>'.$valorb.'</b><c>'.$valorc.'</c> <sol1>'.$resul1.'</sol1><sol2>'.$resul2.'</sol2></segundo ></ecuacion>';
    echo $final;
?>
