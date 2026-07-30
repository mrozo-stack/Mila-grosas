/*=====================================================
         🧇Mila-grosas v0.0
        SISTEMA DE GESTION VENTAS
======================================================*/

/*=====================================================
            NÚMERO DE PEDIDO
======================================================*/

function generarNumeroPedido() {

    const pedidoElemento = document.getElementById("numeroPedido");

    if (!pedidoElemento) return;

    const numero = String(numeroPedido).padStart(4, "0");

    pedidoElemento.textContent = numero;

}

/*=====================================================
        ADICIONAL PERSONALIZADO
======================================================*/

function mostrarOtroAdicional() {

    const check = document.getElementById("otroExtra");
    const div = document.getElementById("personalizado");

    if (!check || !div) return;

    if (check.checked) {

        div.style.display = "block";

    } else {

        div.style.display = "none";

        document.getElementById("nombreExtra").selectedIndex = 0;

        document.getElementById("precioExtra").value = "";

    }

}
/*=====================================================
            CALCULAR PEDIDO
======================================================*/

function calcularPedido() {

    /*=========================================
            OBTENER CONTROLES
    =========================================*/

    const clienteInput = document.getElementById("cliente");
    const producto = document.getElementById("producto");
    const cantidadInput = document.getElementById("cantidad");
    const salsaSelect = document.getElementById("salsa");
    const frutaSelect = document.getElementById("fruta");
    const resumen = document.getElementById("resumenCompra");

    /*=========================================
            VALIDACIONES
    =========================================*/

    if (!clienteInput || !producto || !cantidadInput) {

        alert("Faltan controles del formulario.");

        return 0;

    }

    const cliente = clienteInput.value.trim();

    if (cliente === "") {

        alert("Ingrese el nombre del cliente.");

        return 0;

    }

    const cantidad = Number(cantidadInput.value);

    if (cantidad <= 0) {

        alert("Ingrese una cantidad válida.");

        return 0;

    }

    /*=========================================
            PRODUCTO
    =========================================*/

    const nombreProducto =
        producto.options[producto.selectedIndex].text;

    const precioProducto =
        Number(producto.value);

    const salsa =
        salsaSelect
            ? salsaSelect.value
            : "No seleccionado";

    const fruta =
        frutaSelect
            ? frutaSelect.value
            : "No seleccionada";

    /*=========================================
            ADICIONALES
    =========================================*/

    let subtotal = precioProducto;

    let adicionales = [];

    document
        .querySelectorAll('input[name="extra"]:checked')
        .forEach(extra => {

            subtotal += Number(extra.value);

            adicionales.push(
                extra.parentElement.textContent.trim()
            );

        });

    /*=========================================
        ADICIONAL PERSONALIZADO
    =========================================*/

    const otroExtra =
        document.getElementById("otroExtra");

    if (otroExtra && otroExtra.checked) {

        const lista =
            document.getElementById("nombreExtra");

        const precio =
            Number(
                document.getElementById("precioExtra").value || 0
            );

        if (lista && precio > 0) {

            subtotal += precio;

            adicionales.push(
                lista.options[lista.selectedIndex].text
            );

        }

    }

    /*=========================================
            TOTAL
    =========================================*/

    const total = subtotal * cantidad;

    /*=========================================
            RESUMEN
    =========================================*/

    if (resumen) {

        resumen.innerHTML = `

            <div class="resumen-pedido">

                <p><strong>Cliente:</strong> ${cliente}</p>

                <p><strong>Producto:</strong> ${nombreProducto}</p>

                <p><strong>Salsa:</strong> ${salsa}</p>

                <p><strong>fruta:</strong> ${fruta}</p>

                <p><strong>Cantidad:</strong> ${cantidad}</p>

                <p>
                    <strong>Adicionales:</strong>
                    ${
                        adicionales.length > 0
                        ? adicionales.join(", ")
                        : "Ninguno"
                    }
                </p>

                <hr>

                <h2 style="color:#27ae60">

                    💰 Total:
                    $${total.toLocaleString("es-CO")}

                </h2>

            </div>

        `;

    }

    return total;

}
/*=====================================================
                REALIZAR PEDIDO
======================================================*/

function realizarPedido() {

    /*=========================================
            VALIDAR CAJA ABIERTA
    =========================================*/

    if (!cajaAbierta) {

        alert("⚠ Debe abrir la caja antes de registrar pedidos.");
        return;

    }

    /*=========================================
            VALIDAR CLIENTE
    =========================================*/

    const cliente =
        document.getElementById("cliente").value.trim();

    if (cliente === "") {

        alert("⚠ Ingrese el nombre del cliente.");
        return;

    }

    /*=========================================
            VALIDAR TELÉFONO
    =========================================*/

    const telefono =
        document.getElementById("telefono").value.trim();

    if (telefono === "") {

        alert("⚠ Ingrese el número de celular.");
        return;

    }

    if (telefono.length !== 10 || isNaN(telefono)) {

        alert("⚠ Ingrese un número de celular válido.");
        return;

    }

    if (!telefono.startsWith("3")) {

        alert("⚠ El número celular debe iniciar por 3.");
        return;

    }

    /*=========================================
        VALIDAR TIPO DE CLIENTE
    =========================================*/

    const tipoCliente =
        document.getElementById("tipoCliente").value;

    if (tipoCliente === "") {

        alert("⚠ Seleccione el tipo de cliente.");
        return;

    }

    /*=========================================
            VALIDAR CURSO
    =========================================*/

    const curso =
        document.getElementById("curso").value.trim();

    if (curso === "") {

        alert("⚠ Ingrese el curso.");
        return;

    }

    /*=========================================
        CALCULAR EL PEDIDO
    =========================================*/

    calcularPedido();

    /*=========================================
            FECHA Y HORA
    =========================================*/

    const ahora = new Date();

    /*=========================================
            CREAR PEDIDO
    =========================================*/

    const pedido = {

        numero: numeroPedido,

        fecha: ahora.toLocaleDateString("es-CO"),

        hora: ahora.toLocaleTimeString("es-CO", {

            hour: "2-digit",

            minute: "2-digit"

        }),

        cliente: cliente,

        telefono: telefono,

        producto:
            document.getElementById("producto")
            .selectedOptions[0].text,

        tipoCliente: tipoCliente,

        curso: curso,

        total: obtenerTotal(),

        metodoPago:
            document.getElementById("metodoPago").value,

        estado: "En preparación"

    };

    /*=========================================
        GUARDAR ÚLTIMO PEDIDO
    =========================================*/

    ultimoPedido = pedido;

    pedidos.push(pedido);

    numeroPedido++;

    /*=========================================
            ACTUALIZAR CAJA
    =========================================*/

    ventasCaja += pedido.total;

    totalPedidosCaja++;

    switch (pedido.metodoPago) {

        case "Efectivo":
            totalEfectivo += pedido.total;
            break;

        case "Nequi":
            totalNequi += pedido.total;
            break;

        case "Daviplata":
            totalDaviplata += pedido.total;
            break;

        case "Transferencia":
            totalTransferencia += pedido.total;
            break;

        case "Tarjeta":
            totalTarjeta += pedido.total;
            break;

    }

    /*=========================================
            GUARDAR INFORMACIÓN
    =========================================*/

    guardarPedidos();
    guardarCaja();

    /*=========================================
        ACTUALIZAR PANTALLAS
    =========================================*/

    actualizarCaja();

    if (typeof actualizarDashboard === "function") {

        actualizarDashboard();

    }

    if (typeof actualizarReportes === "function") {

        actualizarReportes();

    }

    if (typeof actualizarHistorial === "function") {

        actualizarHistorial();

    }

    if (typeof actualizarPedidosProceso === "function") {

        actualizarPedidosProceso();

    }

    if (typeof registrarCliente === "function") {

        registrarCliente(cliente, telefono);

    }

    if (typeof generarTicket === "function") {

        generarTicket();

    }

    /*=========================================
            MENSAJE FINAL
    =========================================*/

    alert("✅ Pedido registrado correctamente.");

    limpiarFormulario();

}
    /*=========================================
                GUARDAR PEDIDO
    =========================================*/

    pedidos.push(pedido);

    ultimoPedido = pedido;

    /*=========================================
                ACTUALIZAR CAJA
    =========================================*/

    ventasCaja += pedido.total;

    totalPedidosCaja++;

    switch (pedido.metodoPago) {

        case "Efectivo":
            totalEfectivo += pedido.total;
            break;

        case "Nequi":
            totalNequi += pedido.total;
            break;

        case "Daviplata":
            totalDaviplata += pedido.total;
            break;

        case "Transferencia":
            totalTransferencia += pedido.total;
            break;

        case "Tarjeta":
            totalTarjeta += pedido.total;
            break;

    }

    guardarCaja();

    actualizarCaja();

    /*=========================================
            REGISTRAR CLIENTE
    =========================================*/

    registrarCliente(

        cliente,

        telefono,

        pedido.producto,

        pedido.total

    );

    /*=========================================
            GENERAR TICKET
    =========================================*/

    generarTicket(pedido);

    /*=========================================
            GUARDAR INFORMACIÓN
    =========================================*/

    guardarPedidos();

    /*=========================================
            ACTUALIZAR SISTEMA
    =========================================*/

    actualizarDashboard();

    actualizarReportes();

    actualizarHistorial();

    actualizarPedidosProceso();

    /*=========================================
            NUEVO CONSECUTIVO
    =========================================*/

    numeroPedido++;

    generarNumeroPedido();

  /*=====================================================
                LIMPIAR FORMULARIO
======================================================*/

function limpiarFormulario() {

    /*=========================================
            CAMPOS DE TEXTO
    =========================================*/

    document.getElementById("cliente").value = "";

    document.getElementById("telefono").value = "";

    document.getElementById("curso").value = "";

    /*=========================================
            COMBOS
    =========================================*/

    document.getElementById("tipoCliente").selectedIndex = 0;

    document.getElementById("producto").selectedIndex = 0;

    document.getElementById("salsa").selectedIndex = 0;

    document.getElementById("cantidad").value = 1;

    /*=========================================
            ADICIONALES
    =========================================*/

    document
        .querySelectorAll('input[name="extra"]')
        .forEach(check => check.checked = false);

    const otroExtra =
        document.getElementById("otroExtra");

    if (otroExtra) {

        otroExtra.checked = false;

    }

    /*=========================================
        OCULTAR ADICIONAL PERSONALIZADO
    =========================================*/

    if (typeof mostrarOtroAdicional === "function") {

        mostrarOtroAdicional();

    }

    /*=========================================
            LIMPIAR RESUMEN
    =========================================*/

    const resumen =
        document.getElementById("resumenCompra");

    if (resumen) {

        resumen.innerHTML = "";

    }

}
/*=====================================================
            OBTENER TOTAL DEL PEDIDO
======================================================*/

function obtenerTotal() {

    /*=========================================
            PRODUCTO
    =========================================*/

    const producto = Number(
        document.getElementById("producto").value
    );

    let subtotal = producto;

    /*=========================================
            ADICIONALES
    =========================================*/

    document
        .querySelectorAll('input[name="extra"]:checked')
        .forEach(extra => {

            subtotal += Number(extra.value);

        });

    /*=========================================
        ADICIONAL PERSONALIZADO
    =========================================*/

    const otroExtra =
        document.getElementById("otroExtra");

    if (otroExtra && otroExtra.checked) {

        const precioExtra =
            Number(
                document.getElementById("precioExtra").value || 0
            );

        subtotal += precioExtra;

    }

    /*=========================================
            CANTIDAD
    =========================================*/

    const cantidad =
        Number(
            document.getElementById("cantidad").value
        );

    /*=========================================
            VALIDAR CANTIDAD
    =========================================*/

    if (cantidad <= 0) {

        return 0;

    }

    /*=========================================
            TOTAL
    =========================================*/

    return subtotal * cantidad;

}
/*=====================================================
                ELIMINAR PEDIDO
======================================================*/

function eliminarPedido(indice) {

    const confirmar = confirm(

        "¿Desea eliminar este pedido?"

    );

    if (!confirmar) {

        return;

    }

    pedidos.splice(indice, 1);

    guardarPedidos();

    actualizarDashboard();

    actualizarReportes();

    actualizarHistorial();

    actualizarPedidosProceso();

    actualizarCaja();

    actualizarClientes();

    alert("✅ Pedido eliminado correctamente.");

}
/*=====================================================
                PEDIDO LISTO
======================================================*/

function pedidoListo(indice) {

    // Validar que el pedido exista

    if (!pedidos[indice]) {

        return;

    }

    pedidos[indice].estado = "Listo para entregar";

    guardarPedidos();

    actualizarDashboard();

    actualizarReportes();

    actualizarHistorial();

    actualizarPedidosProceso();

    actualizarCaja();

}

/*=====================================================
                ENTREGAR PEDIDO
======================================================*/

function entregarPedido(indice) {

    // Validar que el pedido exista

    if (!pedidos[indice]) {

        return;

    }

    // Validar estado

    if (pedidos[indice].estado !== "Listo para entregar") {

        alert("⚠ Primero marque el pedido como LISTO.");

        return;

    }

    pedidos[indice].estado = "Entregado";

    guardarPedidos();

    actualizarDashboard();

    actualizarReportes();

    actualizarHistorial();

    actualizarPedidosProceso();

    actualizarCaja();

    alert("✅ Pedido entregado correctamente.");

}