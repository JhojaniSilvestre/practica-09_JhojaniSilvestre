window.onload=inicio;

function inicio(){
    document.formulariomarzo.onsubmit = validar;
    document.formulariomarzo.nombre.onkeypress = admiteletras;
    document.formulariomarzo.descripcion.onkeypress = admiteletras;

    document.formulariomarzo.codigoexpor.onfocus = cambiarColor;
    document.formulariomarzo.codigoexpor.onblur = colorInicial;
    document.formulariomarzo.nombre.onfocus = cambiarColor;
    document.formulariomarzo.nombre.onblur = colorInicial;
    document.formulariomarzo.unidades.onfocus = cambiarColor;
    document.formulariomarzo.unidades.onblur = colorInicial;
    document.formulariomarzo.interno.onfocus = cambiarColor;
    document.formulariomarzo.interno.onblur = colorInicial;
    document.formulariomarzo.descripcion.onfocus = cambiarColor;
    document.formulariomarzo.descripcion.onblur = colorInicial;
    document.formulariomarzo.valor.onfocus = cambiarColor;
    document.formulariomarzo.valor.onblur = colorInicial;
    document.formulariomarzo.internacional.onfocus = cambiarColor;
    document.formulariomarzo.internacional.onblur = colorInicial;
    document.formulariomarzo.caracteristicas.onfocus = cambiarColor;
    document.formulariomarzo.caracteristicas.onblur = colorInicial;
    document.formulariomarzo.fecha.onfocus = cambiarColor;
    document.formulariomarzo.fecha.onblur = colorInicial;

}

function validar(){
    document.formulariomarzo.errcodigoexpor.value = "";
    document.formulariomarzo.errnombre.value = "";
    document.formulariomarzo.errunidades.value = "";
    document.formulariomarzo.errinterno.value = "";
    document.formulariomarzo.errdescripcion.value = "";
    document.formulariomarzo.errvalor.value = "";
    document.formulariomarzo.errinternacional.value = "";
    document.formulariomarzo.errcaracteristicas.value = "";
    document.formulariomarzo.errfecha.value = "";

    let enviar = true;

    let codigoexpor = document.formulariomarzo.codigoexpor.value.trim().toLowerCase();
    if(!validarcodigoexpor(codigoexpor)){
        enviar = false;
        document.formulariomarzo.errcodigoexpor.value += "código de exportación incorrecto";
    }


    return enviar;
}

function validarcodigoexpor(dato){
    
    let correcto = true;
    if (dato.length < 16 || dato.length > 29) {
        correcto = false;
    }
    else{
        let posFind = 0;
        let ausente = true;
        let pos = 0;
        let otrasLetras="áéíóúüñ";
        while (ausente && pos < dato.length) {
            if (dato.charAt(pos) < "a" || dato.charAt(pos) > "z") {
                if (!otrasLetras.includes(dato.charAt(pos))) {
                    ausente= false;
                    posFind = pos;   
                }
            }
            pos+=1;
        }
        //compruebo que posicion tiene la variable posFind
        if (posFind == 0) {
            correcto=false;
        }
        else if(posFind < 3 || posFind > 6){
            correcto = false;
        }
        else{
            let medio1 = dato.substring(posFind,posFind+8);
            ausente = true;
            let index = 0;
            pos = 0;
            while (ausente && pos < medio1.length) {
                if (medio1.charAt(pos) < "0" || medio1.charAt(pos) > "9") {
                    ausente =false;
                    index = pos;
                }
                pos+=1;
            }
            if (index < 4) {
                correcto = false;
            }
            else{
                let medio2 = dato.charAt(posFind+index);
                let otros = "-?";
                if (!otros.includes(medio2)) {
                    correcto = false;
                }
                else{
                    posFind = posFind+index+1;
                    let medio3 = dato.substring(posFind,posFind+3);
                    let especiales = "$%&*/";
                    ausente = true;
                    pos = 0;
                    while(ausente && pos < medio3.length){
                        if (!especiales.includes(medio3.charAt(pos))) {
                            ausente = false;
                        }
                        pos+=1;
                    }
                    if (!ausente) {
                        correcto = false;
                    }
                    else{
                        posFind = posFind+3;
                        let medio4= dato.substring(posFind,posFind+8);
                        ausente = true;
                        pos = 0;
                        
                        while (ausente && pos < medio4.length) {
                            if (medio4.charAt(pos) < "0" || medio4.charAt(pos) > "9") {  
                                if (medio4.charAt(pos) < "a" || medio4.charAt(pos) > "z") {
                                    if (!otrasLetras.includes(medio4.charAt(pos))) {
                                        ausente= false;
                                        index = pos;   
                                    }
                                }
                            }
                            pos+=1;
                        }
                        if (index < 2) {
                            correcto = false;
                        }
                        else{
                            posFind = posFind + index;
                            let final = dato.substring(posFind);
                            console.log(final);
                            console.log("con length "+dato.substring(dato.length));
                            let ausente = true;
                            let pos = 0;
                            while (ausente && pos < final.length) {
                                if (final.charAt(pos) < "0" || final.charAt(pos) > "9") {
                                    ausente =false;
                                }
                                pos+=1;
                            }
                            if (!ausente) {
                                correcto = false;
                            }
                        }

                    }
                }
            }
        }
    }
    console.log(correcto);
    return correcto;
}
    
    


function admiteletras(event){
    let eventos = event || window.event;
    let dato = String.fromCharCode(eventos.charCode).toLowerCase();
    let correcto = true;
    if (dato < "a" || dato > "z") {
        if (dato != " ") {
            correcto = false;
        }
    }
    return correcto;
}

function cambiarColor(event){
    let eventos = event || window.event;
    eventos.target.style.color = "blue";
    eventos.target.style.backgroundColor = "yellow";
}

function colorInicial(event){
    let eventos = event || window.event;
    eventos.target.style.color = "black";
    eventos.target.style.backgroundColor = "white";
}