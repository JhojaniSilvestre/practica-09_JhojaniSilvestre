if(document.addEventListener)
    window.addEventListener("load",inicio)
else if(document.attachEvent)
    window.attachEvent("onloa",inicio);

function inicio(){
    let boton = document.getElementById("obtener");
    if(document.addEventListener)
        boton.addEventListener("click",proceso)
    else if(document.attachEvent)
        boton.attachEvent("onclick",proceso);
}
let peticion;
function proceso(){
    let velo = document.getElementById("velo").value.trim();
    let roza = document.getElementById("roza").value.trim();

    if (soloNum(velo) && soloNum(roza)) {
        //creo el objeto
        if(window.XMLHttpRequest)
            peticion = new XMLHttpRequest()
        else if(window.ActiveXObject)
            peticion =new ActiveXObject("Microsoft.XMLHTTP");
        //asigno evento ready
        if(document.addEventListener)
            peticion.addEventListener("readystatechange",procesar)
        else if(document.attachEvent)
            peticion.attachEvent("onreadystatechange",procesar); 
        //establezco la conexion con php
        peticion.open("POST","php/ejercicio06.php");
        //establezco cabecera
        peticion.setRequestHeader("Content-Type","application/json");

        let datos = new Object()
        datos.Velocidad = velo;
        datos.Rozamiento = roza;

        let json = JSON.stringify(datos);
        peticion.send(json);

    }
}

function procesar(){
    if (peticion.readyState == 4) {
        if (peticion.status == 200) {
            let datos=JSON.parse(peticion.responseText);
            console.log(datos.Distancia);
            document.getElementById("dis").value = datos.Distancia;
        }
        
    }
    
}

function soloNum(dato){
    let valido = true;
    let pos = 0;
    if (dato =="") {
        valido = false;
    }else{
        while (valido && pos <dato.length) {
            if (dato.charAt(pos)<"0" || dato.charAt(pos)>"9") {
                valido = false;
            }
            pos+=1;
        }
    }
    return valido;
}