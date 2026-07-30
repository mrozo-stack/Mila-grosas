/*=====================================================
        Mila-grosas v0.0
        SISTEMA PROFESIONAL DE VENTAS
======================================================*/

/*=====================================================
                VARIABLES CAJA
======================================================*/

let cajaAbierta = false;

let cierreCaja = false;

let montoInicialCaja = 0;

let ventasCaja = 0;

let totalPedidosCaja = 0;

/*=====================================================
        TOTALES POR MÉTODO DE PAGO
======================================================*/

let totalEfectivo = 0;

let totalNequi = 0;

let totalDaviplata = 0;

let totalTransferencia = 0;

let totalTarjeta = 0;

let inversionReal = 220700;

/*=====================================================
                ABRIR CAJA
======================================================*/

function abrirCaja() {

    if (cajaAbierta) {

        alert("La caja ya se encuentra abierta.");

        return;

    }

    const monto = prompt("Ingrese el monto inicial de la caja:");

    if (monto === null) return;

    if (isNaN(monto) || Number(monto) < 0) {

        alert("Ingrese un valor válido.");

        return;

    }

    montoInicialCaja = Number(monto);

    ventasCaja = 0;

    totalPedidosCaja = 0;

    totalEfectivo = 0;

    totalNequi = 0;

    totalDaviplata = 0;

    totalTransferencia = 0;

    totalTarjeta = 0;
    localStorage.setItem(
    "horaApertura",
    new Date().toLocaleTimeString(
        "es-CO",
        {
            hour:"2-digit",
            minute:"2-digit"
        }
    )
);
localStorage.removeItem("horaCierre");

    cajaAbierta = true;

    cierreCaja = false;

    localStorage.setItem(
    "cajeroCaja",
    document.getElementById("nombreUsuario").textContent
    );
    guardarCaja();

    actualizarCaja();

    alert("✅ Caja abierta correctamente.");

}


/*=====================================================
                CERRAR CAJA
======================================================*/

function cerrarCaja() {

    if (!cajaAbierta) {

        alert("La caja ya está cerrada.");

        return;

    }

    if (!confirm("¿Desea cerrar la caja?")) {

        return;

    }

    cajaAbierta = false;

    cierreCaja = true;
localStorage.setItem(
    "horaCierre",
    new Date().toLocaleTimeString(
        "es-CO",
        {
            hour:"2-digit",
            minute:"2-digit"
        }
    )
);
    guardarCaja();

    actualizarCaja();

    alert("✅ Caja cerrada correctamente.");

}

/*=====================================================
            ACTUALIZAR CAJA
======================================================*/

function actualizarCaja() {

    const estado = document.getElementById("estadoCaja");
    const monto = document.getElementById("montoInicial");
    const ventas = document.getElementById("ventasCaja");
    const pedidos = document.getElementById("pedidosCaja");

    const efectivo = document.getElementById("totalEfectivo");
    const nequi = document.getElementById("totalNequi");
    const daviplata = document.getElementById("totalDaviplata");
    const transferencia = document.getElementById("totalTransferencia");
    const tarjeta = document.getElementById("totalTarjeta");

    if (
        !estado ||
        !monto ||
        !ventas ||
        !pedidos
    ) {

        return;

    }

    estado.textContent =

        cajaAbierta

            ? "🟢 Caja Abierta"

            : "🔴 Caja Cerrada";

    monto.textContent =

        "$" + montoInicialCaja.toLocaleString("es-CO");

    ventas.textContent =

        "$" + ventasCaja.toLocaleString("es-CO");

    pedidos.textContent = totalPedidosCaja;

    if (efectivo) {

        efectivo.textContent =
            "$" + totalEfectivo.toLocaleString("es-CO");

    }

    if (nequi) {

        nequi.textContent =
            "$" + totalNequi.toLocaleString("es-CO");

    }

    if (daviplata) {

        daviplata.textContent =
            "$" + totalDaviplata.toLocaleString("es-CO");

    }

    if (transferencia) {

        transferencia.textContent =
            "$" + totalTransferencia.toLocaleString("es-CO");

    }

    if (tarjeta) {

        tarjeta.textContent =
            "$" + totalTarjeta.toLocaleString("es-CO");

    }
/*=========================================
    DATOS ADICIONALES DE CAJA
=========================================*/

const apertura =
    document.getElementById("horaApertura");

const cierre =
    document.getElementById("horaCierre");

const cajero =
    document.getElementById("cajeroCaja");

const totalCajaElement =
    document.getElementById("totalCaja");

const arqueo =
    document.getElementById("arqueoCaja");

const inversion =
    document.getElementById("inversionRealCaja");

const ventasTotales =
    document.getElementById("ventasTotalesCaja");

const gananciaFinal =
    document.getElementById("gananciaFinalCaja");

/* Apertura */

if(apertura){

    const horaGuardada =
        localStorage.getItem("horaApertura");

    apertura.textContent =
        horaGuardada || "--:--";

}

/* Cierre */

if(cierre){

    if(cajaAbierta){

        cierre.textContent = "--:--";

    }else{

        const horaCierreGuardada =
            localStorage.getItem("horaCierre");

        cierre.textContent =
            horaCierreGuardada || "--:--";

    }

}
/* Cajero */

if(cajero){

    cajero.textContent =
        localStorage.getItem("cajeroCaja")
        || "-";

}
/* Total Caja */

if(totalCajaElement){

    totalCajaElement.textContent =

        "$" +

        (
            montoInicialCaja +
            ventasCaja
        ).toLocaleString("es-CO");

}

/* Arqueo */

if(arqueo){

    arqueo.textContent =

        "$" +

        ventasCaja.toLocaleString("es-CO");

}
/* Inversión Inicial */

if(inversion){

    inversion.textContent =

        "$" +

        inversionReal.toLocaleString("es-CO");

}

/* Ventas Totales */

if(ventasTotales){

    ventasTotales.textContent =

        "$" +

        ventasCaja.toLocaleString("es-CO");

}

/* Ganancia Final */

if(gananciaFinal){

    gananciaFinal.textContent =

        "$" +

        (
            ventasCaja -
            inversionReal
        ).toLocaleString("es-CO");

}
}

/*=====================================================
                GUARDAR CAJA
======================================================*/

function guardarCaja() {

    const caja = {

        cajaAbierta,

        cierreCaja,

        montoInicialCaja,

        ventasCaja,

        totalPedidosCaja,

        totalEfectivo,

        totalNequi,

        totalDaviplata,

        totalTransferencia,

        totalTarjeta

    };

    localStorage.setItem(

        "cajaDiaria",

        JSON.stringify(caja)

    );

}

/*=====================================================
                CARGAR CAJA
======================================================*/

function cargarCaja() {

    const datos = JSON.parse(

        localStorage.getItem("cajaDiaria")

    );

    if (!datos) {

        return;

    }

    cajaAbierta = datos.cajaAbierta || false;

    cierreCaja = datos.cierreCaja || false;

    montoInicialCaja = datos.montoInicialCaja || 0;

    ventasCaja = datos.ventasCaja || 0;

    totalPedidosCaja = datos.totalPedidosCaja || 0;

    totalEfectivo = datos.totalEfectivo || 0;

    totalNequi = datos.totalNequi || 0;

    totalDaviplata = datos.totalDaviplata || 0;

    totalTransferencia = datos.totalTransferencia || 0;

    totalTarjeta = datos.totalTarjeta || 0;

    actualizarCaja();

}

/*=====================================================
            ICONO DEL MÉTODO DE PAGO
======================================================*/

function obtenerIconoPago(metodo) {

    if (!metodo) {

        return "💰";

    }

    switch (metodo) {

        case "Efectivo":
            return "💵";

        case "Nequi":
            return "📱";

        case "Daviplata":
            return "📲";

        case "Transferencia":
            return "🏦";

        case "Tarjeta":
            return "💳";

        default:
            return "💰";

    }

}

/*=====================================================
         MÉTODO DE PAGO
======================================================*/

function obtenerClasePago(metodo) {

    switch (metodo) {

        case "Efectivo":
            return "pago-efectivo";

        case "Nequi":
            return "pago-nequi";

        case "Daviplata":
            return "pago-daviplata";

        case "Transferencia":
            return "pago-transferencia";

        case "Tarjeta":
            return "pago-tarjeta";

        default:
            return "pago-default";

    }

}

/*=====================================================
         EXPORTAR REPORTE EXCEL
======================================================*/

function exportarExcel(){

    const datos = [

        ["DRINK THIS"],
        ["REPORTE DE CAJA"],
        [""],

        ["Monto Inicial", montoInicialCaja],
        ["Ventas del Día", ventasCaja],
        ["Total Pedidos", totalPedidosCaja],

        [""],

        ["Efectivo", totalEfectivo],
        ["Nequi", totalNequi],
        ["Daviplata", totalDaviplata],
        ["Transferencia", totalTransferencia],
        ["Tarjeta", totalTarjeta],

        [""],

        ["Inversión Real", inversionReal],
        ["Resultado Actual", ventasCaja - inversionReal]

    ];

    const hoja = XLSX.utils.aoa_to_sheet(datos);

    const libro = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        libro,
        hoja,
        "Caja"
    );

    XLSX.writeFile(
        libro,
        "Reporte_Caja_Deleite_Colombiano.xlsx"
    );

}