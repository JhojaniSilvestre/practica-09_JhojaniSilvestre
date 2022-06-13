window.onload=inicio;

function inicio(){
    document.formulariomarzo.onsubmit = validar;
    //document.formulariomarzo.nombre.onkeypress = admiteletras;
    //document.formulariomarzo.descripcion.onkeypress = admiteletras;

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
    let enviar = true;
    
    document.formulariomarzo.errcodigoexpor.value = "";
    document.formulariomarzo.errnombre.value = "";
    document.formulariomarzo.errunidades.value = "";
    document.formulariomarzo.errinterno.value = "";
    document.formulariomarzo.errdescripcion.value = "";
    document.formulariomarzo.errvalor.value = "";
    document.formulariomarzo.errinternacional.value = "";
    document.formulariomarzo.errcaracteristicas.value = "";
    document.formulariomarzo.errfecha.value = "";
    document.formulariomarzo.errtipo.value = "";
    document.formulariomarzo.errciudad.value = "";
    document.formulariomarzo.errcomunidades.value = "";

    let codigoexpor = document.formulariomarzo.codigoexpor.value.trim().toLowerCase();
    let nombre = document.formulariomarzo.nombre.value.trim().toLowerCase();
    let unidades = document.formulariomarzo.unidades.value.trim().toLowerCase();
    let interno = document.formulariomarzo.interno.value.trim().toLowerCase();
    let descripcion = document.formulariomarzo.descripcion.value.trim().toLowerCase();
    let valor = document.formulariomarzo.valor.value.trim().toLowerCase();
    let internacional = document.formulariomarzo.internacional.value.trim().toLowerCase();
    let caracteristicas = document.formulariomarzo.caracteristicas.value.trim().toLowerCase();
    let fecha = document.formulariomarzo.fecha.value.trim().toLowerCase();
    let tipo = document.formulariomarzo.tipo.value;
    let ciudad = document.formulariomarzo.elements;
    let comunidad = document.formulariomarzo.comunidad;
/*------------------------------------validacion exahustiva ---------------------------------*/
    if(!validarcodigoexpor(codigoexpor)){
        enviar = false;
        document.formulariomarzo.errcodigoexpor.value += "código de exportación incorrecto";
    }
    if(!validarNombre(nombre)){
        enviar = false;
        document.formulariomarzo.errnombre.value += "Nombre incorrecto";  
    }
    if (!validarUnidades(unidades)) {
        enviar = false;
        document.formulariomarzo.errunidades.value += "Unidades incorrectas";  
    }
/*------------------------------------ validacion expresiones regulares ------------------------*/
    let expreInterno = /^\d{4,7}[a-záéíóúüñ]{5,8}[\$@]\d{2}[\da-záéíóúüñ]{6}$/i;
    if (!expreInterno.test(interno)) {
        enviar = false;
        document.formulariomarzo.errinterno.value += "Código interno incorrecto";   
    }
    let expreDescrip = /^[a-záéíóúüñ]{6}[\da-záéíóúüñ\-\$%\/]{5,29}[\da-záéíóúüñ\,]{2}$/i;
    if (!expreDescrip.test(descripcion)) {
        enviar = false;
        document.formulariomarzo.errdescripcion.value += "Descripción incorrecta";   
    }
    let expreValor = /^(([5-9][0-9]{4})|([1-9][0-9]{5})|([1-9][0-9]{6}))$/i;
    if (!expreValor.test(valor)) {
        enviar = false;
        document.formulariomarzo.errvalor.value += "Valor incorrecto";   
    }
/*------------------------------------ validacion objeto regex ------------------------*/
    let regexInternacional = new RegExp("^[a-záéíóúüñ]{10,17}$","i");
    if (!regexInternacional.test(internacional)) {
        enviar = false;
        document.formulariomarzo.errinternacional.value += "Código internacional incorrecto";   
    }
    let regexCaracte = new RegExp("^(([1-9][0-9])|([1-9][0-9]{2})|([1-9][0-9]{3})|([1-9][0-9]{4})|([1-9][0-9]{5})|([1-9][0-9]{6}))$","i");
    if (!regexCaracte.test(caracteristicas)) {
        enviar = false;
        document.formulariomarzo.errcaracteristicas.value += "Características incorrectas";   
    }
    /*
    let regexFecha = new RegExp("^()$","i");
    //(([0-2][1-9]|3[01])\\/(0[13578]|1[02])\\/[0-9]{2,4}))
    if (!regexFecha.test(fecha)) {
        enviar = false;
        document.formulariomarzo.errfecha.value += "Fecha incorrecta";   
    }
    */
    /*-----------validar radio-----------*/
    if (tipo =="") {
        enviar = false;
        document.formulariomarzo.errtipo.value += "Se debe seleccionar un tipo de artículo";
    }
    /*-----------validar checkbox--------*/
    let cont = 0;
    for (let pos = 0; pos < ciudad.length; pos++) {
        if (ciudad[pos].type == "checkbox") {
            if (ciudad[pos].checked) {
                cont+=1;
            }
        }
    }
    if (cont < 2) {
        enviar = false;
        document.formulariomarzo.errciudad.value += "Se debe seleccionar al menos dos ciudades";
    }
    /*-----------validar option--------*/
    cont = 0;
    for (let pos = 0; pos < comunidad.length; pos++) {
        if (comunidad[pos].selected) {
            cont+=1;
        }
    }
    if (cont < 4) {
        enviar = false;
        document.formulariomarzo.errcomunidades.value += "Se debe seleccionar al menos dos comunidades";
    }
    return enviar;
}
/*------------------------------------validacion exahustiva ------------------------------------*/

function validarUnidades(dato){
    let valido = true;
    let pos = 0;
    if(dato == ""){
        valido = false;
    }else{
        while (valido && pos < dato.length) {
            if (dato.charAt(pos) < "0" || dato.charAt(pos) > "9") {
                valido = false;
            }
            pos+=1;
        }
    }
    return valido;
}

function validarNombre(dato){
    let valido = true;
    if (dato.length < 7 || dato.length > 13) {
        valido = false;
    }else{
        //validar principio
        let pos = 0;
        let empiezo = dato.substring(0,2);
        let adicionales = "áéíóúüñ";
        console.log("empiezonom "+empiezo);
        while (valido && pos < empiezo.length) {
            if (empiezo.charAt(pos) < "a" || empiezo.charAt(pos) > "z") {
                if (!adicionales.includes(empiezo.charAt(pos))) {
                    if (empiezo.charAt(pos) < "0" || empiezo.charAt(pos) > "9") {
                        valido = false;
                    }
                }
            }
            pos+=1;
        }
        //validar final
        let final = dato.charAt(dato.length-1);
        console.log("finalnom "+final);
        let caracter = "#";
        pos=0;
        while (valido && pos < final.length) {
            if (final.charAt(pos) < "a" || final.charAt(pos) > "z") {
                if (!adicionales.includes(final.charAt(pos))) {
                    if (!caracter.includes(final.charAt(pos))) {
                        valido = false;
                    }
                }
            }
            pos+=1;
        }
        //validar medio
        let medio = dato.substring(2,dato.length-1);
        console.log("medionom "+medio);
        let otros = " -.";
        pos = 0;
        while (valido && pos < medio.length) {
            if (medio.charAt(pos) < "a" || medio.charAt(pos) > "z") {
                if (!adicionales.includes(medio.charAt(pos))) {
                    if(!otros.includes(medio.charAt(pos))){
                        if (medio.charAt(pos) < "0" || medio.charAt(pos) > "9") {
                            valido = false;
                        }
                    }
                }
            }
            pos+=1;
        }

    }
    return valido;
}

function validarcodigoexpor(dato){
    let valido = true;
    console.log("longitud "+dato.length);
    if (dato.length < 16 || dato.length > 29) {
        valido = false;
    }
    else{
        //validacion principio
        let empiezo = dato.substring(0,6);
        console.log("empiezo "+empiezo);
        let adicionales = "áéíóúüñ";
        let ausente = true;
        let pos = 0;
        //index controla la posicion desde la que empiezo a crear las subcadenas
        let index = 0;
        while (ausente && pos < empiezo.length) {
            if (empiezo.charAt(pos) < "a" || empiezo.charAt(pos) > "z") {
                if (!adicionales.includes(empiezo.charAt(pos))) {
                    ausente = false;
                }
            }
            pos+=1;
        }
        //compruebo en que posicion ha sido encontrado el caracter no letra
        //para determinar si la posicion es valida
        if (!ausente && pos-1 < 3 ) {
            valido = false;
        }else if(!ausente && pos-1 >=3){
            index = pos-1;
        }
        else if(ausente){
            index = pos;
        }
        
        if (valido) {
            //validacion medio1, 4 - 8 digitos
            console.log("el index "+index);
            let medio1 = dato.substring(index,index+8);
            console.log("medio1 "+medio1);
            ausente = true;
            pos = 0;
            while (ausente && pos < medio1.length) {
                if (medio1.charAt(pos) < "0" || medio1.charAt(pos) > "9") {
                        ausente = false;
                }
                pos+=1;
            }
            //compruebo en que posicion ha sido encontrado el caracter no numero
            //para determinar si la posicion es valida
            if (!ausente && pos-1 < 4 ) {
                valido = false;
            }else if(!ausente && pos-1 >=4){
                index = index + pos-1;
            }
            else if(ausente){
                index = index + pos;
            }
            console.log("el index medio2 "+index);
            //validacion medio2, un "-" o "?"
            if (valido) {
                let medio2 = dato.charAt(index);
                console.log("medio2 "+medio2);
                let otros = "-?";
                if (!otros.includes(medio2)) {
                    valido = false;
                } 
            }
            //validacion medio3, tres caracteres $%&*/
            index +=1;
            let medio3 = dato.substring(index,index+3);
            console.log("medio3 "+medio3);
            let especiales = "$%&/*";
            pos = 0;
            while (valido && pos < medio3.length) {
                if(!especiales.includes(medio3.charAt(pos))){
                    valido = false;
                }
                pos+=1;
            }
            //validacion medio4, 2 - 8 caracteres letras o digitos
            if (valido) {
                index = index + 3;
                let medio4 = dato.substring(index,dato.length-3);
                if (medio4.length < 2 || medio4.length > 8) {
                    valido = false;
                }else{
                    console.log("medio4 "+medio4);
                    pos = 0;
                    while (valido && pos < medio4.length) {
                        if (medio4.charAt(pos) < "a" || medio4.charAt(pos) > "z") {
                            if (!adicionales.includes(medio4.charAt(pos))) {
                                if (medio4.charAt(pos) < "0" || medio4.charAt(pos) > "9") {
                                    valido = false;
                                }
                            }
                        }
                        pos+=1;
                    }
                }//fin else
            }//fin if
        }
        //validacion final
        let final = dato.substring(dato.length-3,dato.length);
        console.log("final "+final);
        pos = 0;
        while (valido && pos < final.length) {
            if (final.charAt(pos) < "0" || final.charAt(pos) > "9") {
                valido = false;
            }
            pos+=1;
        }
    }
    return valido;
}

function admiteletras(evento){
    let eventos = evento || window.event;
    let dato = String.fromCharCode(eventos.charCode).toLowerCase();
    let correcto = true;
    if (dato < "a" || dato > "z") {
        if (dato != " ") {
            correcto = false;
        }
    }
    return correcto;
}

function cambiarColor(evento){
    let eventos = evento || window.event;
    eventos.target.style.color = "blue";
    eventos.target.style.backgroundColor = "yellow";
}

function colorInicial(evento){
    let eventos = evento || window.event;
    eventos.target.style.color = "black";
    eventos.target.style.backgroundColor = "white";
}