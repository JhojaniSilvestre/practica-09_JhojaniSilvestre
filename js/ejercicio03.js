$(window).on("load",inicio);

function inicio(){
    $("#incluir").on("click",proceso);
}

function proceso(){
    let familia = $("#familia").val().trim().toLowerCase();
    let subfamilia = $("#subfamilia").val().trim().toLowerCase();
    let individuos = $("#individuos").val().trim().toLowerCase();
    let esnum = solonumeros(individuos);
    if (familia !="" && subfamilia !="" && esnum) {
        let filas = $("#tablaanimales>tbody>tr");
        let filasTf = $("#tablaanimales>tfoot>tr");
        
        let ausente = true;
        let pos=0;
        while(ausente && pos < $(filas).length){
            let celdas = $(filas).eq(pos).find("td");
            if (familia < $(celdas).eq(0).text()) {
                ausente = false;
                $(filas).eq(pos).before("<tr><td>"+familia+"</td>"+
                "<td>"+subfamilia+"</td>"+"<td>"+individuos+"</td></tr>");
                //
                let totalIndiv = $(filasTf).eq(0).find("td").eq(1).text().trim();
                let totalFam = $(filasTf).eq(1).find("td").eq(1).text().trim();
                let totalSubfam = $(filasTf).eq(2).find("td").eq(1).text().trim();

                $(filasTf).eq(0).find("td").eq(1).text(parseInt(totalIndiv)+parseInt(individuos));
                $(filasTf).eq(1).find("td").eq(1).text(parseInt(totalFam)+1);
                $(filasTf).eq(2).find("td").eq(1).text(parseInt(totalSubfam)+1);
            }
            else if(familia == $(celdas).eq(0).text() && subfamilia == $(celdas).eq(1).text()){
                ausente = false;
                let numIndiv = parseInt(individuos) + parseInt($(celdas).eq(2).text());
                $(celdas).eq(2).text(numIndiv);

                let totalIndiv = $(filasTf).eq(0).find("td").eq(1).text().trim();
                $(filasTf).eq(0).find("td").eq(1).text(parseInt(totalIndiv)+parseInt(individuos));
            }
            else if (familia == $(celdas).eq(0).text() && subfamilia > $(celdas).eq(1).text()) {
                ausente = false;
                $(filas).eq(pos).before("<tr><td>"+familia+"</td>"+
                "<td>"+subfamilia+"</td>"+"<td>"+individuos+"</td></tr>");
                
                let totalIndiv = $(filasTf).eq(0).find("td").eq(1).text().trim();
                let totalSubfam = $(filasTf).eq(2).find("td").eq(1).text().trim();

                $(filasTf).eq(0).find("td").eq(1).text(parseInt(totalIndiv)+parseInt(individuos));
                $(filasTf).eq(2).find("td").eq(1).text(parseInt(totalSubfam)+1);
            }
            pos+=1;
        }
        if (ausente) {
            $("#tablaanimales>tbody").append("<tr><td>"+familia+"</td>"+
            "<td>"+subfamilia+"</td>"+"<td>"+individuos+"</td></tr>");

            let totalIndiv = $(filasTf).eq(0).find("td").eq(1).text().trim();
            let totalFam = $(filasTf).eq(1).find("td").eq(1).text().trim();
            let totalSubfam = $(filasTf).eq(2).find("td").eq(1).text().trim();
            //individuos
            if (totalIndiv == "") {
                $(filasTf).eq(0).find("td").eq(1).empty();
                $(filasTf).eq(0).find("td").eq(1).text(individuos);
            }
            else{
                let total = parseInt(totalIndiv) + parseInt(individuos);
                $(filasTf).eq(0).find("td").eq(1).text(total);
            }
            //familias
            if (totalFam == "") {
                $(filasTf).eq(1).find("td").eq(1).empty();
                $(filasTf).eq(1).find("td").eq(1).text("1");
            }
            else{
                $(filasTf).eq(1).find("td").eq(1).text(parseInt(totalFam)+1);
            }
            //subfamilias
            if (totalSubfam == "") {
                $(filasTf).eq(2).find("td").eq(1).empty();
                $(filasTf).eq(2).find("td").eq(1).text("1");
            }
            else{
                $(filasTf).eq(2).find("td").eq(1).text(parseInt(totalSubfam)+1);
            }
        }
    }
}

function solonumeros(dato){
    let valido = true;
    let pos = 0;
    if (dato == "") {
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

