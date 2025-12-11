function obtenerCarrito() {
    var guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarContador() {
    var carrito = obtenerCarrito();
    document.getElementById("contador").textContent = carrito.length;
}

function filtrarPorCategoria(categoria) {
    var productos = document.querySelectorAll(".tarjeta-producto");
    var titulo = document.querySelector(".seccion-productos h2");

    titulo.textContent = categoria === "Todos" ? "Ofertas Destacadas" : categoria;

    for (var i = 0; i < productos.length; i++) {
        var cat = productos[i].getAttribute("data-categoria");
        productos[i].style.display = (categoria === "Todos" || categoria === cat) ? "block" : "none";
    }

    document.getElementById("filtro-categoria").value = categoria;
}

function configurarBotonesAgregar() {
    var botones = document.querySelectorAll(".boton-agregar");

    for (var i = 0; i < botones.length; i++) {
        botones[i].onclick = function () {
            var tarjeta = this.parentElement;

            var producto = {
                nombre: tarjeta.getAttribute("data-nombre"),
                precio: tarjeta.getAttribute("data-precio"),
                categoria: tarjeta.getAttribute("data-categoria"),
                imagen: tarjeta.getAttribute("data-imagen")
            };

            var carrito = obtenerCarrito();
            carrito.push(producto);
            guardarCarrito(carrito);
            actualizarContador();

            var b = this;
            b.textContent = "Agregado ✓";
            b.style.background = "#16c44f";

            setTimeout(function () {
                b.textContent = "Agregar al carrito";
                b.style.background = "#27ae60";
            }, 1200);
        };
    }
}

function configurarFiltros() {
    var items = document.querySelectorAll("[data-filtro]");

    for (var i = 0; i < items.length; i++) {
        items[i].onclick = function () {
            var categoria = this.getAttribute("data-filtro");

            var check = document.getElementById("menu-toggle");
            if (check) check.checked = false;

            setTimeout(function () {
                filtrarPorCategoria(categoria);
            }, 100);
        };
    }

    document.getElementById("filtro-categoria").onchange = function () {
        filtrarPorCategoria(this.value);
    };
}

actualizarContador();
configurarBotonesAgregar();
configurarFiltros();
