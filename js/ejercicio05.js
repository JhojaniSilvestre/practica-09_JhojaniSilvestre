if(document.addEventListener)
    window.addEventListener("load",inicio)
else if(document.attachEvent)
    window.attachEvent("onload",inicio);

function inicio() {
    let boton = document.getElementById("solucion");
    if(document.addEventListener)
        boton.addEventListener("click",proceso)
    else if(document.attachEvent)
        boton.attachEvent("onclick",proceso);
}

function proceso(){
    let a = document.getElementById("vala").value.trim();
    let b = document.getElementById("valb").value.trim();
    let c = document.getElementById("valc").value.trim();

    if (solonum(a) && solonum(b) && solonum(c)) {
        xml = "<ecuacion><segundo><a>"+a+"</a><b>"+b+"</b><c>"+c+"</c></segundo></ecuacion>";
        let estado = {
            method: "POST",
            headers: {"Content-Type":"application/x-www-form-urlencoded"},
            body: xml
        }

        fetch("php/ejercicio05.php",estado)
            .then(tratar)
            .catch(errores);
    }
}

function errores(){
    alert("ha surgido un error");
}

function tratar(respuesta){
    if(respuesta.ok)
        respuesta.text().then(procesar);
}

function procesar(resultado){
    let parsar = new DOMParser();
    let datos = parsar.parseFromString(resultado,"application/xml");
    document.getElementById("sol1").value = datos.querySelector("sol1").textContent;
    document.getElementById("sol2").value = datos.querySelector("sol2").textContent;
}
function solonum(dato){
    let valido = true;
    let pos = 0;
    if (dato == "") {
        valido = false;
    }
    else{
        while (valido && pos<dato.length) {
            if (dato.charAt(pos) < "0" || dato.charAt(pos) > "9") {
                valido = false;
            }
            pos+=1;
        }
    }
    return valido;
}

