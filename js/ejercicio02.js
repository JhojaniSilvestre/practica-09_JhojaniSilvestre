if(document.addEventListener)
    window.addEventListener("load",inicio)
else if(document.attachEvent)
    window.attachEvent("onload",inicio);

function inicio(){
    let boton = document.getElementById("poner");
    if(document.addEventListener)
        boton.addEventListener("click",proceso)
    else if(document.attachEvent)
        boton.attachEvent("onclick",proceso);
}

function proceso(){
    let valido = true;
    //validar marca
    let marca = document.getElementById("marca").value.trim().toLowerCase();
    if (marca == "") {
        valido = false;
    }
    //validar numero de unidades
    let numero = document.querySelectorAll("#numero>option");
    let unidades;
    let cont = 0;
    for (let index = 0; index < numero.length; index++)
        if (numero.item(index).selected && numero.item(index).value != ""){
            cont+=1;
            unidades = numero.item(index).value;
        }
    if (cont < 1) {
        valido = false;
    }
    //validar input radio tipo coche
    let tipo = document.querySelectorAll("input[name='tipo']:checked");
    if (tipo.length < 1) {
        valido = false;
    }
    console.log("valido "+valido);
    if (valido) {
        //añadir fila a la tabla, orden asc por marca, si no existe
        let tbody = document.querySelector("tbody");
        let filas = tbody.getElementsByTagName("tr");
        let celdas;
        //añadir a la lista si existe
        let lista = listacoches;
        let ausente = true;
        let pos = 0;
        console.log(filas.length);
        while (ausente && pos<filas.length) {
            celdas = filas.item(pos).getElementsByTagName("td");
            console.log("fila 0 "+celdas.item(0).textContent);
            if (marca == celdas.item(0).textContent) {
                ausente = false;
                //modiificar 
                celdas.item(1).textContent = unidades;
                celdas.item(2).textContent = tipo.item(0).value;
                //añadir a la lista
                let inexistente = true;
                let index = 0;
                let nodosLi = lista.getElementsByTagName("li");
                while (inexistente && index < nodosLi.length) {
                    if (marca == nodosLi.item(index).textContent) {
                        inexistente = false;
                    }
                    else if (marca > nodosLi.item(index).textContent) {
                        inexistente = false;
                        let newLi = document.createElement("li");
                        let newText = document.createTextNode(marca);
                        newLi.appendChild(newText);
                        lista.insertBefore(newLi,nodosLi.item(index));
                    }
                    index+=1;
                }
                if (inexistente) {
                    let newLi = document.createElement("li");
                    let newText = document.createTextNode(marca);
                    newLi.appendChild(newText);
                    lista.appendChild(newLi);
                }
            }
            else if(marca < celdas.item(0).textContent){
                ausente = false;
                let tr = document.createElement("tr");

                let td1 = document.createElement("td");
                let td2 = document.createElement("td");
                let td3 = document.createElement("td");
    
                let text1 = document.createTextNode(marca);
                let text2 = document.createTextNode(unidades);
                let text3 = document.createTextNode(tipo.item(0).value);
    
                td1.appendChild(text1);
                td2.appendChild(text2);
                td3.appendChild(text3);
    
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
    
                tbody.insertBefore(tr,filas.item(pos));
            }
            pos+=1;
        }
        if (ausente) {
            let tr = document.createElement("tr");

            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");

            let text1 = document.createTextNode(marca);
            let text2 = document.createTextNode(unidades);
            let text3 = document.createTextNode(tipo.item(0).value);

            td1.appendChild(text1);
            td2.appendChild(text2);
            td3.appendChild(text3);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);

            tbody.appendChild(tr);
        }
    }

    

    
    
}