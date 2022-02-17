

document.addEventListener('DOMContentLoaded', () => {
    iniciarCompra();
})



class Compra {
    constructor(obj, cantidad) {
        this.id = obj.id;
        this.nombre = obj.nombre;
        this.tipo = obj.tipo;
        this.imagen = obj.imagen;
        this.precio = obj.precio;
        this.cantidad = cantidad;
    }
}

let productosAgregadosHastaAhora = [];
let contenidoLocalStorage;


class Carrito {
    
    agregarProducto() {
        
        if(document.getElementById('boton-carrito')) {

            const botonAgregarAlCarrito = document.getElementById('boton-carrito');
            let contenidoCarrito = [];

            botonAgregarAlCarrito.addEventListener('click', () => {
                            
                const productoComprado = JSON.parse(localStorage.getItem('productoEnPantalla'));
                const compra = new Compra(productoComprado, parseInt(document.getElementById('cantidad').value));
    
                if(localStorage.getItem('carrito')) {                                               // Si ya hay productos en carrito
                    contenidoCarrito = JSON.parse(localStorage.getItem('carrito'));            // Leer todos los productos en carrito (LS)
                }
    
                if (contenidoCarrito.find(x => x.id === compra.id)) {
                    console.log("EL PRODUCTO YA FUE AGREGADO AL CARRITO");
                    return;
                } else {
                    contenidoCarrito.push(compra);
                    localStorage.setItem('carrito', JSON.stringify(contenidoCarrito));
                }
            })

            
        }
    }

    eliminarProducto() {
        let carritoDesplegado = document.querySelector(".carrito");              // marca el icono del carrito
        let contenidoCarrito = [];
        let carritoActualizado = [];

        carritoDesplegado.addEventListener("click", (carr) => {          
            let producto, productoID;
            if(carr.target.classList.contains("borrar-producto")) {
                console.log("DISTE CLICK EN BORRAR");
                carr.target.parentElement.parentElement.remove();
                /* console.log(carr.target.parentElement.parentElement); */
                producto = carr.target.parentElement.parentElement;
                console.log(producto);
                productoID = parseInt(producto.querySelector('a').getAttribute('data-id'));
                console.log(productoID);

                // LEER LOCAL STORAGE
                contenidoCarrito = JSON.parse(localStorage.getItem('carrito'));
                console.log(contenidoCarrito);
                // 
                contenidoCarrito.forEach(x => console.log(x.id)) ;
                carritoActualizado = contenidoCarrito.filter( x => x.id !== productoID);
                console.log(carritoActualizado);
                localStorage.setItem('carrito', JSON.stringify(carritoActualizado)); 
            }
        })
    }

    insertarCarritoDOM() {
        const iconoCarrito = document.querySelector('#dropdown01');

        iconoCarrito.addEventListener('click', () => {
            const contenidoCarrito = JSON.parse(localStorage.getItem('carrito'));
            const listaProductos = document.querySelector(".lista-carrito tbody");

            listaProductos.innerHTML = '';  
            
            
            contenidoCarrito.forEach(element => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>
                        <img src="${element.imagen}" width=100>
                    </td>
                    <td>${element.nombre}</td>
                    <td>${element.precio}</td>
                    <td>
                        <a href="#" class="borrar-producto fas fa-times-circle" data-id="${element.id}"></a>
                    </td>
                `;
                listaProductos.appendChild(row);
            });
        })
    }

    vaciarCarrito() {
        document.addEventListener("click", (e) => {
            if(e.target.id === "vaciar-carrito") {
                localStorage.removeItem('carrito');
            }
        })
    }

    procesarCompra() {
        document.addEventListener("click", e => {
            if(e.target.id === "procesar-pedido") {
                // ====================================================================================================================
            }
        })
    }  
}

function iniciarCompra() {
    const carritoDeCompras = new Carrito();

    carritoDeCompras.agregarProducto();
    carritoDeCompras.eliminarProducto();
    carritoDeCompras.insertarCarritoDOM();
    carritoDeCompras.vaciarCarrito();
    carritoDeCompras.procesarCompra();
}
