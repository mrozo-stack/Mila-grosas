/*=====================================================
       🧇Mila-grosas v0.0
        Sistema Web de Ventas
======================================================*/

/*=====================================================
                VARIABLES GLOBALES
======================================================*/

let pedidos = [];

let numeroPedido = 1;

let totalVentas = 0;

let productoMasVendido = "";

let clienteFrecuente = "";
let ultimoPedido = null;

const IVA = 0;

const MONEDA = "es-CO";
/*=====================================================
            INICIALIZAR SISTEMA
======================================================*/

window.onload = function () {

    console.log("APP INICIADA");

    actualizarFechaHora();

    validarSesion();

    mostrarUsuario();

    aplicarPermisos();

    cargarPedidos();

    cargarClientes();

    cargarCaja();

    generarNumeroPedido();

    actualizarDashboard();

    actualizarReportes();

    actualizarHistorial();

    actualizarClientes();

    actualizarPedidosProceso();

    setInterval(actualizarFechaHora, 1000);

};