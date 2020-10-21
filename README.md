# TampermonkeyScripts
Scripts para utilizar con la Extensión Tampermonkey

Es necesario instalar Tampermonkey (está para Opera, Firefox y Chrome como add-on). 
(https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)

Una vez instalada la extensión, pegan dentro de nuevo Script el contenido del .js y lo guardan.

-----------------------------------------------------------TiendaMia.js-----------------------------------------------------------
El script agrega los precios finales, además de mantener el original.
Los precios estimados en la página del producto son casi un 100% de las veces los correctos. 
Pero son comprando solamente ESE producto. 
"Suma al carrito": indica cuanto más termina agregando al valor final del carrito, pre -courier, cuando ya hay otros elementos.
También da un estimativo en la pagina del carrito, pero no es preciso como el otro (para ser justos, con lo otro me bastaba, pero es un buen aproximado al real).
Y por ultimo, tambien cambia los precios al buscar, pero este si que es un estimado muy bolatil ya no tiene ni el peso del producto e incluso cambian los precios al entrar a ver el detalle en algunos casos.

Esta adaptado para $ARG pero se puede modificar sin mucha dificultad para otros países calculo.

-----------------------------------------------------------SteamARS.js-----------------------------------------------------------
Este no es de mí autoría, y es de donde saque la idea de hacer el de TiendaMia:
https://pastebin.com/jPEiWLjy

El script cambia el precio, agrega un +65%. 
Y al pasar el cursor sobre el cuadro de +65%, se muestra el precio original. 
Y es posible que no funcione en algunos precios. 

Credito por este script: http://perberos.me/
