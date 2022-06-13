$(window).on("load",inicio);

function inicio(){
    $("#calcular").on("click",proceso);
}

function proceso(){
    let caras = $("#caras").val().trim();
    let vertices = $("#vertices").val().trim();
    if (soloNum(caras) && soloNum(vertices)) {
        let datos = new FormData();
        datos.append("numcaras",caras);
        datos.append("numvertices",vertices);
        let configura = {
            method: "POST",
            data: datos,
            success: procesar,
            contentType: false,
            processData: false
        }
        $.ajax("php/ejercicio04.php",configura);
    }

}

function procesar(resultado){
    console.log(resultado);
    $("#aristas").val(resultado);
}

function soloNum(dato){
    let valido = true;
    let pos = 0;
    if (dato=="") {
        valido = false;
    }else{
        while (valido && pos<dato.length) {
            if (dato.charAt(pos) < "0" || dato.charAt(pos) > "9") {
                valido = false;
            }
            pos+=1;
        }
    }
    return valido;
}