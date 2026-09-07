
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de detalles cargada');
    
    // Verificamos que la lista de productos existe
    if (typeof productos === 'undefined') {
        console.error('Error: No se encontró la lista de productos');
        mostrarError('No se pudo cargar la información del producto');
        return;
    }
    
    
    let producto = null;
    
    
    const productoGuardado = localStorage.getItem('productoDetalle');
    if (productoGuardado) {
        producto = JSON.parse(productoGuardado);
        console.log('Producto cargado desde localStorage:', producto.nombre);
    }
    
    // buscamos por id
    if (!producto) {
        const urlParams = new URLSearchParams(window.location.search);
        const id = parseInt(urlParams.get('id'));
        
        if (id && typeof productos !== 'undefined') {
            producto = productos.find(function(p) {
                return p.id === id;
            });
            console.log('Producto cargado desde URL (ID:', id, '):', producto ? producto.nombre : 'No encontrado');
        }
    }
    
    
    if (!producto) {
        console.warn('No se encontró ningún producto');
        mostrarError('Producto no encontrado');
        return;
    }
    
    // cargamos productos
    cargarDetalleProducto(producto);
    
    // agregamos al carrito
    configurarBotonAgregar(producto);
    
    //validamos cantidad
    configurarInputCantidad();
});



function cargarDetalleProducto(producto) {
    // Actualizar la imagen
    var img = document.getElementById('detalleImg');
    if (img) {
        img.src = producto.imagen || '../assets/img/default.jpg';
        img.alt = producto.nombre || 'Producto';
    }
    
    // Actualizar nombre
    var nombreElement = document.getElementById('detalleNombre');
    if (nombreElement) {
        nombreElement.textContent = producto.nombre || 'Producto';
    }
    
    // Actualizar precio
    var precioElement = document.getElementById('detallePrecio');
    if (precioElement) {
        precioElement.textContent = '$' + (producto.precio || 0).toLocaleString();
    }
    
    // Actualizar descripción
    var descripcionElement = document.getElementById('detalleDescripcion');
    if (descripcionElement) {
        descripcionElement.innerHTML = '<p>' + (producto.descripcion || 'Producto de alta calidad de DarkWear') + '</p>';
    }
    
    // Actualizar categoría
    var categoriaElement = document.getElementById('detalleCategoria');
    if (categoriaElement) {
        const categorias = {
            'camperas': 'Camperas',
            'remeras': 'Remeras',
            'pantalones': 'Pantalones',
            'accesorios': 'Accesorios',
            'otros': 'Otros'
        };
        categoriaElement.textContent = categorias[producto.categoria] || producto.categoria;
    }
    
    // Generamos las tallas
    var tallasContainer = document.getElementById('detalleTallas');
    if (tallasContainer) {
        var tallas = producto.tallas || ['S', 'M', 'L', 'XL'];
        tallasContainer.innerHTML = '';
        
        tallas.forEach(function(talla, index) {
            var label = document.createElement('label');
            var input = document.createElement('input');
            input.type = 'radio';
            input.name = 'talla';
            input.value = talla;
            if (index === 0) input.checked = true;
            
            var span = document.createElement('span');
            span.textContent = talla;
            
            label.appendChild(input);
            label.appendChild(span);
            tallasContainer.appendChild(label);
        });
    }
    
    // Actualizar el título de la página
    document.title = producto.nombre + ' - DarkWear';
    
    // Guardar el producto en una variable global
    window.productoActual = producto;
}

function configurarBotonAgregar(producto) {
    var btnAgregar = document.getElementById('btnAgregarDetalle');
    if (btnAgregar) {
        btnAgregar.addEventListener('click', function() {
            var nombre = document.getElementById('detalleNombre').textContent;
            var precioTexto = document.getElementById('detallePrecio').textContent;
            var precio = parseInt(precioTexto.replace(/[$.]/g, ''));
            
            var tallaSeleccionada = document.querySelector('input[name="talla"]:checked');
            var talla = tallaSeleccionada ? tallaSeleccionada.value : 'S';
            
            var cantidadInput = document.getElementById('cantidad');
            var cantidad = parseInt(cantidadInput ? cantidadInput.value : 1) || 1;
            
            // Validar que la cantidad sea válida
            if (cantidad < 1) {
                alert('La cantidad debe ser al menos 1');
                return;
            }
            
            if (cantidad > 10) {
                alert('La cantidad máxima es 10 unidades');
                return;
            }
            
            // USAR LA NUEVA FUNCIÓN CON CANTIDAD
            if (typeof window.agregarAlCarritoConCantidad === 'function') {
                window.agregarAlCarritoConCantidad(nombre, precio, cantidad);
                alert('✓ Se agregaron ' + cantidad + ' unidad(es) de "' + nombre + '" (Talla: ' + talla + ') al carrito');
            } else if (typeof window.agregarAlCarrito === 'function') {
                // Fallback: agregar de a uno
                for (var i = 0; i < cantidad; i++) {
                    window.agregarAlCarrito(nombre, precio);
                }
                alert('✓ Se agregaron ' + cantidad + ' unidad(es) de "' + nombre + '" (Talla: ' + talla + ') al carrito');
            } else {
                alert('Error: El carrito no está disponible');
            }
        });
    }
}


function configurarInputCantidad() {
    var cantidadInput = document.getElementById('cantidad');
    if (cantidadInput) {
        cantidadInput.addEventListener('change', function() {
            var valor = parseInt(this.value) || 1;
            if (valor < 1) {
                this.value = 1;
            } else if (valor > 10) {
                this.value = 10;
                alert('La cantidad máxima es 10 unidades');
            }
        });
    }
}

function mostrarError(mensaje) {
    var container = document.querySelector('.detalle-container');
    if (container) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem; grid-column: 1 / -1;">
                <h3 style="color: var(--text-primary);">${mensaje}</h3>
                <p style="color: var(--text-muted); margin: 1rem 0;">
                    El producto que buscas no está disponible o ha sido eliminado.
                </p>
                <a href="productos.html" style="color: var(--primary); text-decoration: none; font-weight: 500;">
                    ← Volver a productos
                </a>
            </div>
        `;
    }
}