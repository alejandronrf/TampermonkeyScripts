// ==UserScript==
// @name         Steam Argentina - Muestra precio final con Impuestos
// @namespace    http://perberos.me/
// @version      0.1
// @description  Agrega +65% al precio
// @author       Perberos
// @match        https://store.steampowered.com/*
// @grant        none
// ==/UserScript==

// Cambiar este valor si cambia el impuesto
// esto es: +21% del IVA, +9% por impuesto PAIS y +35% el retroactivo a moneda extranjera.
var impuestos = 21 + 9 + 35;
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
    var discount_final_price = document.querySelectorAll(".discount_final_price");
    var game_purchase_price = document.querySelectorAll(".game_purchase_price");
    var regular_price = document.querySelectorAll(".regular_price");

    function do_prices (a) {
        var cadena = a.innerText.trim();

        if (cadena != "Free" && cadena.indexOf("ARS$") >= 0) {
            if (cadena.indexOf("Your Price:") >= 0) cadena = cadena.split("Your Price:")[1].trim()

            var b = cadena.split(" ");
            b[1] = Number(b[1].replace(".", "").replace(",", ".")) * impuestos_porcentaje;

            a.innerHTML = "<div class='tax_pct' style='color: #c2c2c2; background: #5d5d5d; display: inline-block;' title='Precio sin impuestos: " + cadena + "'>+65%</div> " + b[0] + " " + nf(b[1]);
        }
    };

    regular_price.forEach(do_prices);
    game_purchase_price.forEach(do_prices);
    discount_final_price.forEach(do_prices);

    // El area de DLCs es algo especial
    var game_area_dlc_price = document.querySelectorAll(".game_area_dlc_price");

    game_area_dlc_price.forEach(function (a) {
        if (a.childNodes.length == 1) { // al parecer ya lo toma la funcion de arriba, y solo debemos procesar los que no tienen descuentos
            var cadena = a.innerText.trim();

            if (cadena != "Free" && cadena.indexOf("ARS$") >= 0) {
                if (cadena.indexOf("Your Price:") >= 0) cadena = cadena.split("Your Price:")[1].trim()

                var b = cadena.split(" ");
                b[1] = Number(b[1].replace(".", "").replace(",", ".")) * impuestos_porcentaje;

                a.innerHTML = "<div class='tax_pct' style='color: #c2c2c2; background: #5d5d5d; display: inline-block;' title='Precio sin impuestos: " + cadena + "'>+65%</div> " + b[0] + " " + nf(b[1]);
            }
        }
    });

    // esto es para la lista de /search/
    var search_price = document.querySelectorAll(".search_price");

    // funcion personalizada por el espacio limitado en el cuadro de busqueda
    function do_prices_ext (a) {
        var cadena, b;
        // tiene descuento
        if (a.childNodes[3]) {
            cadena = a.childNodes[3].data.trim();

            if (cadena != "Free" && cadena.indexOf("ARS$") >= 0) {
                if (cadena.indexOf("Your Price:") >= 0) cadena = cadena.split("Your Price:")[1].trim()

                b = cadena.split(" ");
                b[1] = Number(b[1].replace(".", "").replace(",", ".")) * impuestos_porcentaje;

                a.childNodes[3].data = "* " + b[0] + " " + nf(b[1]);
            }
        }
        else { // normal sin descuento
            cadena = a.innerText.trim();

            if (cadena != "Free" && cadena.indexOf("ARS$") >= 0) {
                if (cadena.indexOf("Your Price:") >= 0) cadena = cadena.split("Your Price:")[1].trim()

                b = cadena.split(" ");
                b[1] = Number(b[1].replace(".", "").replace(",", ".")) * impuestos_porcentaje;

                a.innerHTML = "<span title='Precio sin impuestos: " + cadena + "'><span class='tax_pct' style='color: #888888;'>*</span> " + b[0] + " " + nf(b[1]) + "</span>";
            }
        }
    };

    search_price.forEach(do_prices_ext);
})();
