/*=====================================================
        🧇Mila-grosas v0.0
        MÓDULO DE CLIENTES
======================================================*/

/*=====================================================
            BASE DE DATOS DE CLIENTES
======================================================*/

let clientes = [];

/*=====================================================
            GUARDAR CLIENTES
======================================================*/

function guardarClientes() {

    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );

}

/*=====================================================
            CARGAR CLIENTES
======================================================*/

function cargarClientes() {

    const datos = localStorage.getItem("clientes");

    if (datos) {

        try {

            clientes = JSON.parse(datos);

        } catch (error) {

            clientes = [];

        }

    } else {

        clientes = [];

    }

}

/*=====================================================
            REGISTRAR CLIENTE
======================================================*/

function registrarCliente(cliente, telefono, producto, total) {

    /*=========================================
            VALIDAR DATOS
    =========================================*/

    cliente = (cliente || "").trim();

    telefono = (telefono || "").trim();

    producto = producto || "Sin producto";

    total = Number(total) || 0;

    if (cliente === "" || telefono === "") {

        return;

    }

    /*=========================================
            BUSCAR CLIENTE
    =========================================*/

    let clienteExistente = clientes.find(

        c => c.telefono === telefono

    );

    /*=========================================
            ACTUALIZAR CLIENTE
    =========================================*/

    if (clienteExistente) {

        clienteExistente.nombre = cliente;

        clienteExistente.compras =
            Number(clienteExistente.compras || 0) + 1;

        clienteExistente.totalComprado =
            Number(clienteExistente.totalComprado || 0) + total;

        clienteExistente.productoFavorito = producto;

        clienteExistente.ultimaCompra =
            new Date().toLocaleDateString("es-CO");

    }

    /*=========================================
            NUEVO CLIENTE
    =========================================*/

    else {

        clientes.push({

            nombre: cliente,

            telefono: telefono,

            compras: 1,

            totalComprado: total,

            primeraCompra:
                new Date().toLocaleDateString("es-CO"),

            ultimaCompra:
                new Date().toLocaleDateString("es-CO"),

            productoFavorito: producto

        });

    }

    /*=========================================
            GUARDAR
    =========================================*/

    guardarClientes();

    actualizarClientes();

}

/*=====================================================
        ACTUALIZAR TABLA DE CLIENTES
======================================================*/

function actualizarClientes() {

    const contenedor =
        document.getElementById("clientes");

    if (!contenedor) {

        return;

    }

    if (clientes.length === 0) {

        contenedor.innerHTML = `

            <div class="sin-clientes">

                👥 No hay clientes registrados.

            </div>

        `;

        return;

    }

    let tabla = `

        <table class="tabla-clientes">

            <thead>

                <tr>

                    <th>Cliente</th>

                    <th>Celular</th>

                    <th>Compras</th>

                    <th>Total Comprado</th>

                </tr>

            </thead>

            <tbody>

    `;

    clientes.forEach(cliente => {

        tabla += `

            <tr>

                <td>${cliente.nombre}</td>

                <td>${cliente.telefono}</td>

                <td>${Number(cliente.compras || 0)}</td>

                <td>

                    $${Number(cliente.totalComprado || 0)
                        .toLocaleString("es-CO")}

                </td>

            </tr>

        `;

    });

    tabla += `

            </tbody>

        </table>

    `;

    contenedor.innerHTML = tabla;

}

/*=====================================================
            INICIALIZAR MÓDULO
======================================================*/

cargarClientes();

actualizarClientes();