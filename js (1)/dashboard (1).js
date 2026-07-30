/*=====================================================
        🧇Mila-grosas v0.0
        SISTEMA DE GESTION DE VENTAS
======================================================*/


/*=====================================================
                DASHBOARD
======================================================*/

function actualizarDashboard() {

    const lblTotalPedidos = document.getElementById("totalPedidos");
    const lblIngresos = document.getElementById("ingresos");
    const lblProductoTop = document.getElementById("productoTop");
    const lblClienteTop = document.getElementById("clienteTop");

    if (
        !lblTotalPedidos ||
        !lblIngresos ||
        !lblProductoTop ||
        !lblClienteTop
    ) {
        return;
    }

    let ingresos = 0;
    let pendientes = 0;
    let entregados = 0;

    const productos = {};

    const clientesFrecuentes = {};

   pedidos.forEach(pedido => {

    // Total de ingresos

    ingresos += Number(pedido.total);

    // Contador de estados

    if (pedido.estado === "Entregado") {

        entregados++;

    } else {

        pendientes++;

    }

    // Producto más vendido

    if (pedido.producto) {

        const nombreProducto =
            pedido.producto
            .split("($")[0]
            .trim();

        productos[nombreProducto] =
            (productos[nombreProducto] || 0) + 1;

    }

    // Cliente frecuente

    if (pedido.cliente) {

        clientesFrecuentes[pedido.cliente] =

            (clientesFrecuentes[pedido.cliente] || 0) + 1;

    }

});
     
    let productoTop = "-";

    let clienteTop = "-";

    let maxProducto = 0;

    let maxCliente = 0;

    for (const producto in productos) {

        if (productos[producto] > maxProducto) {

            maxProducto = productos[producto];

            productoTop = producto;

        }

    }

    for (const cliente in clientesFrecuentes) {

        if (clientesFrecuentes[cliente] > maxCliente) {

            maxCliente = clientesFrecuentes[cliente];

            clienteTop = cliente;

        }

    }

    lblTotalPedidos.textContent = pedidos.length;

    lblIngresos.textContent =
        "$" + ingresos.toLocaleString("es-CO");

    lblProductoTop.textContent = productoTop;

    lblClienteTop.textContent = clienteTop;
    const lblPendientes =
    document.getElementById(
        "pendientesPedidos"
    );

const lblEntregados =
    document.getElementById(
        "entregadosPedidos"
    );

if (lblPendientes) {

    lblPendientes.textContent =
        pendientes;

}

if (lblEntregados) {

    lblEntregados.textContent =
        entregados;

}

}


/*=====================================================
            PEDIDOS EN PROCESO
======================================================*/

function actualizarPedidosProceso() {

    const contenedor = document.getElementById("listaPedidos");

    if (!contenedor) return;

    const pendientes = pedidos.filter(

        pedido => pedido.estado !== "Entregado"

    );

    if (pendientes.length === 0) {

        contenedor.innerHTML = `

            <h3>

                ✅ Todos los pedidos fueron entregados.

            </h3>

        `;

        return;

    }

    let html = "";

    pendientes.forEach((pedido) => {

        const indice = pedidos.indexOf(pedido);

        html += `

            <div class="tarjetaPedido">

                <h3>

                     Pedido #${pedido.numero}

                </h3>

                <p>

                    <strong>👤 Cliente:</strong>

                    ${pedido.cliente}

                </p>

                <p>

                    <strong>📱 Celular:</strong>

                    ${pedido.telefono}

                </p>

                <p>

                    <strong>🥞 Producto:</strong>

                    ${pedido.producto}

                </p>

                <p>

                    <strong>💰 Total:</strong>

                    $${pedido.total.toLocaleString("es-CO")}

                </p>

                <p>

                    <strong>🕒 Hora:</strong>

                    ${pedido.hora}

                </p>

                <p>

                    <strong>💳 Pago:</strong>

                    ${pedido.metodoPago}

                </p>

                <p>

                    <strong>Estado:</strong>

                    <span class="estado ${pedido.estado.replace(/\s+/g, "-")}">

                        ${pedido.estado}

                    </span>

                </p>

                <div class="botonesEstado">

                    <button
                        class="btn-listo"
                        onclick="pedidoListo(${indice})">

                        ✅ Listo

                    </button>

                    <button
                        class="btn-entregar"
                        onclick="entregarPedido(${indice})">

                        🚚 Entregar

                    </button>

                </div>

            </div>

        `;

    });

    contenedor.innerHTML = html;

}