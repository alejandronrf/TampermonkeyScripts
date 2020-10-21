// ==UserScript==
// @name         TiendaMia - Muestra precio final con Impuestos
// @namespace    https://www.youtube.com/channel/UCzq2sT4M0uouWSGvIruMzEw
// @version      1.0
// @description  Agrega impuestos finales al precio
// @author       Mordax
// @match        https://tiendamia.com/ar/*
// @grant        none
// ==/UserScript==

// Cambiar este valor si cambia el impuesto
// esto es: +21% del IVA, +9% por impuesto PAIS y +35% el retroactivo a moneda extranjera.
var impuestos = 1;//21 + 9 + 35;
var impuestos_porcentaje = (100 + impuestos) / 100; // el valor original 100% + impuestos / %100, deberia dar 1.65 si es 65%.

(function() {
    'use strict';

    // Create our number formatter.
    // https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
    var formatter = new Intl.NumberFormat('en-AR', {
        style: 'currency',
        currency: 'ARS',

        // These options are needed to round to whole numbers if that's what you want.
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
    // parsea una numero 123456.123456 a una cadena "123.456,12"
    var nf = function (strnum) {
        return (strnum.toFixed(2).toString().replace(".", ",")).replace(/(\..*)$|(\d)(?=(\d{3})+(?!\d))/g, (digit, fract) => fract || digit + '.');
    };

    // busco la mayoria de los elementos HTML que contienen el precio.
    var paginaProducto = document.querySelectorAll("#allfinalpricecountry_ar_producto_ajax");
    var finalCarrito = document.querySelectorAll("#subtotal_de_orden_local");
    var listado = document.querySelectorAll(".item-real-price");

    function do_page (a) {
        var peso = parseFloat(document.querySelector('#weight_producto_ajax').innerText); //Peso

        var cadena = a.innerText.trim();
        if (cadena.indexOf("AR$") >= 0) {
            var b = cadena.split(" ");
            b[1] = Number(b[1].replace(".", "").replace(",", "."));

            var carrito = b[1] + 570 + Math.ceil((b[1] * 0.115)/10)*10 + Math.ceil((3260 * peso)/10)*10; // esto es: "Valor" + "Envío internacional" + "Tarifa de Procesamiento" + "Costo por Kilo"

            var gestionAduana = Math.floor(((((b[1] + 570)))/2 + 190)/ 10)*10; //Estimado aprox
            var courrier = carrito + gestionAduana + 1130 //+Entrega

            var tresCoutas = courrier * 1.144;
            var seisCoutas = courrier * 1.188;
            var doceCoutas = courrier * 1.308;

            a.innerHTML = "<div style='color: #c2c2c2; display: inline-block;' title='Precio original: " + cadena + "'>Precios Estimados: </div> ";
            a.innerHTML = a.innerHTML + "<div style='font-size:small;line-height: normal;'>Original: " + cadena + "<br>Solo en Carrito: $" + carrito + "<br>Suma al Carrito: $" + (carrito-570) + "<br> Final Solo C/Courrier: " + b[0] + " " + nf(courrier) + "<br> 3 coutas de $"+nf(tresCoutas/3)+" ($"+nf(tresCoutas)+") <br> 6 coutas de $"+nf(seisCoutas/6)+" ($"+nf(seisCoutas)+") <br> 12 coutas de $"+nf(doceCoutas/12)+" ($"+nf(doceCoutas)+") </div>";
        }
    };

    function do_carrito (a) {

        var cadena = a.innerText.trim();
        if (cadena.indexOf("AR$") >= 0) {
            var b = cadena.split(" ");
            b[1] = Number(b[1].replace(".", "").replace(",", "."));

            var courrier = b[1] *1.5; //Aprox

            var tresCoutas = courrier * 1.144;
            var seisCoutas = courrier * 1.188;
            var doceCoutas = courrier * 1.308;

            a.innerHTML = "<div style='color: #c2c2c2; text-decoration: line-through;'>"+ b +"</div> ";
            a.innerHTML = a.innerHTML + "<div style='line-height: normal;'>FINAL Aprox: " + nf(courrier) + "</div> ";
            a.innerHTML = a.innerHTML + "<div style='font-size:small;line-height: normal;'>3 de $"+nf(tresCoutas/3)+" ($"+nf(tresCoutas)+") <br> 6 de $"+nf(seisCoutas/6)+" ($"+nf(seisCoutas)+") <br> 12 de $"+nf(doceCoutas/12)+" ($"+nf(doceCoutas)+") </div>";
        }
    };

    function do_lista (a) {

        var cadena = a.innerText.trim();
        if (cadena.indexOf("AR$") >= 0) {
            var b = cadena.split(" ");
            b[1] = Number(b[1].replace(".", "").replace(",", "."));

            var aprox = b[1] + Math.ceil((b[1] * 0.115)/10)*10 + Math.ceil((3260 * 0.529)/10)*10; //aprox

            a.innerHTML = "<div style='color: #c2c2c2; text-decoration: line-through;'>"+ b +"</div> <div style='line-height: normal;font-size:small;'>+$" + nf(aprox) + "|F: $"+ nf(aprox*1.5) +" (aprox)</div> ";
        }
    };

    paginaProducto.forEach(do_page);
    finalCarrito.forEach(do_carrito);
    listado.forEach(do_lista);

})();
