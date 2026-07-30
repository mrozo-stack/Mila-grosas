/*=====================================================
            FECHA Y HORA
======================================================*/

function actualizarFechaHora() {
    
    const fechaElemento =
        document.getElementById("fechaActual");

    const horaElemento =
        document.getElementById("horaActual");

    const ahora = new Date();

    const fecha =
        ahora.toLocaleDateString("es-CO");

    const hora =
        ahora.toLocaleTimeString("es-CO", {

            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"

        });

    if (fechaElemento) {

        fechaElemento.textContent = fecha;

    }

    if (horaElemento) {

        horaElemento.textContent = hora;

    }

}
  
/*=====================================================
                LOCAL STORAGE
======================================================*/

function guardarPedidos(){

    localStorage.setItem(

        "pedidosCapasDulces",

        JSON.stringify(pedidos)

    );

}

function cargarPedidos(){

    const datos=localStorage.getItem(

        "pedidosCapasDulces"

    );

    if(datos){

        pedidos=JSON.parse(datos);

        numeroPedido=pedidos.length+1;

    }

}
