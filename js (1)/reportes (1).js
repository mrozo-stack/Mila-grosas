/*=====================================================
                REPORTES
======================================================*/

function actualizarReportes() {

    const contenedor = document.getElementById("reportes");

    if (!contenedor) return;

    if (pedidos.length === 0) {

        contenedor.innerHTML = `

            <div class="sin-registros">

                📋 No existen pedidos registrados.

            </div>

        `;

        return;

    }

    let html = `

    <table class="tabla-reportes">

        <thead>

            <tr>

                <th>#</th>

                <th>Fecha</th>

                <th>Hora</th>

                <th>Cliente</th>

                <th>Producto</th>

                <th>Pago</th>

                <th>Total</th>

                <th>Estado</th>

                <th>Acciones</th>

            </tr>

        </thead>

        <tbody>

    `;

    pedidos.forEach((pedido, indice) => {

        html += `

        <tr>

            <td>${pedido.numero}</td>

            <td>${pedido.fecha}</td>

            <td>${pedido.hora}</td>

            <td>${pedido.cliente}</td>

            <td>${pedido.producto}</td>

            <td>

                ${obtenerIconoPago(pedido.metodoPago)}

                ${pedido.metodoPago}

            </td>

            <td>

                $${pedido.total.toLocaleString("es-CO")}

            </td>

            <td>

                <span class="estado ${pedido.estado.replace(/\s+/g,"-")}">

                    ${pedido.estado}

                </span>

            </td>

            <td>

                <button
                    class="btn-listo"
                    onclick="pedidoListo(${indice})">

                    ✅

                </button>

                <button
                    class="btn-entregar"
                    onclick="entregarPedido(${indice})">

                    🚚

                </button>

                <button
                    class="btn-eliminar"
                    onclick="eliminarPedido(${indice})">

                    🗑

                </button>

            </td>

        </tr>

        `;

    });

    html += `

        </tbody>

    </table>

    `;

    contenedor.innerHTML = html;

}

/*=====================================================
                BUSCADOR
======================================================*/

function buscarPedido() {

    const texto = document
        .getElementById("buscar")
        .value
        .toLowerCase();

    const filtrados = pedidos.filter(pedido =>

        pedido.cliente.toLowerCase().includes(texto)

    );

    actualizarHistorial(filtrados);

}

/*=====================================================
                HISTORIAL
======================================================*/

function actualizarHistorial(lista = pedidos) {

    const contenedor = document.getElementById("historialPedidos");

    if (!contenedor) return;

    if (lista.length === 0) {

        contenedor.innerHTML = `

            <div class="sin-registros">

                📋 No existen pedidos.

            </div>

        `;

        return;

    }

    let html = "";

    lista.forEach(pedido => {

        html += `

<div class="card-dashboard">

    <h3>

         Pedido #${pedido.numero}

    </h3>

    <p>

        👤 <strong>Cliente:</strong>

        ${pedido.cliente}

    </p>

    <p>

         <strong>Producto:</strong>

        ${pedido.producto}

    </p>

    <p>

        📅 <strong>Fecha:</strong>

        ${pedido.fecha}

    </p>

    <p>

        🕒 <strong>Hora:</strong>

        ${pedido.hora}

    </p>

    <p>

        💳 <strong>Pago:</strong>

        ${pedido.metodoPago}

    </p>

    <p class="total-historial">

        💰 $${pedido.total.toLocaleString("es-CO")}

    </p>

    <p class="estado-historial">

        📦 ${pedido.estado}

    </p>

</div>
    `;

    });

    contenedor.innerHTML = html;

}