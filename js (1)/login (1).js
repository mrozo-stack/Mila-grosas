/*=====================================================
                LOGIN 🧇Mila-grosas
======================================================*/

/*=====================================================
                USUARIOS DEL SISTEMA
======================================================*/

const usuarios = [

    {
        usuario: "admin",
        clave: "admin123",
        rol: "admin",
        nombre: "Administrador"
    },

    {
        usuario: "cajero",
        clave: "12345",
        rol: "cajero",
        nombre: "Cajero"
    }

];

/*=====================================================
                INICIAR SESIÓN
======================================================*/

function iniciarSesion() {

    const usuario = document.getElementById("usuario").value.trim();

    const clave = document.getElementById("clave").value.trim();

    const rol = document.getElementById("rol").value;

    const recordar = document.getElementById("recordar").checked;

    const encontrado = usuarios.find(u =>

        u.usuario === usuario &&
        u.clave === clave &&
        u.rol === rol

    );

    if (!encontrado) {

        alert("❌ Usuario, contraseña o rol incorrectos.");

        return;

    }

    localStorage.setItem(

        "usuarioActivo",

        JSON.stringify(encontrado)

    );

    if (recordar) {

        localStorage.setItem(

            "ultimoUsuario",

            usuario

        );

    } else {

        localStorage.removeItem("ultimoUsuario");

    }

    alert(`Bienvenido ${encontrado.nombre}`);

    window.location.href = "index.htm";

}

/*=====================================================
            RECORDAR USUARIO
======================================================*/

window.onload = function () {

    const ultimoUsuario = localStorage.getItem("ultimoUsuario");

    if (!ultimoUsuario) return;

    const usuario = document.getElementById("usuario");

    const recordar = document.getElementById("recordar");

    if (usuario) {

        usuario.value = ultimoUsuario;

    }

    if (recordar) {

        recordar.checked = true;

    }

};

/*=====================================================
            VALIDAR SESIÓN
======================================================*/

function validarSesion() {

    const usuarioActivo = JSON.parse(

        localStorage.getItem("usuarioActivo")

    );

    if (!usuarioActivo) {

        window.location.href = "login.html";

    }

}

/*=====================================================
            MOSTRAR USUARIO
======================================================*/
function mostrarUsuario() {

    const usuarioActivo = JSON.parse(
        localStorage.getItem("usuarioActivo")
    );

    const nombre =
        document.getElementById("nombreUsuario");

    const rol =
        document.getElementById("rolUsuario");

    if(!usuarioActivo){
        return;
    }

    if(nombre){

        nombre.textContent =
            "👤 " + usuarioActivo.nombre;

    }

    if(rol){

        rol.textContent =
            usuarioActivo.rol.toUpperCase();

    }

}

/*=====================================================
            PERMISOS POR ROL
======================================================*/

function aplicarPermisos() {

    const usuario = JSON.parse(

        localStorage.getItem("usuarioActivo")

    );

    if (!usuario) return;

    // El administrador tiene acceso completo

    if (usuario.rol === "admin") {

        return;

    }

    // Ocultar módulos administrativos al cajero

    const dashboard = document.getElementById("seccionDashboard");

    const reportes = document.getElementById("seccionReportes");

    const historial = document.getElementById("seccionHistorial");

    const clientes = document.getElementById("seccionClientes");

    if (dashboard) dashboard.style.display = "none";

    if (reportes) reportes.style.display = "none";

    if (historial) historial.style.display = "none";

    if (clientes) clientes.style.display = "none";

}

/*=====================================================
            CERRAR SESIÓN
======================================================*/

function cerrarSesion() {

    const confirmar = confirm(

        "¿Desea cerrar la sesión?"

    );

    if (!confirmar) return;

    localStorage.removeItem("usuarioActivo");

    window.location.href = "login.html";

}
