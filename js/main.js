
document.addEventListener('DOMContentLoaded', function() {

    var currentPage = window.location.pathname.split('/').pop() || 'home.html';
    var navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(function(link) {
        var href = link.getAttribute('href').split('/').pop();
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    var carrito = [];
    var cartCount = document.getElementById('cartCount');
    var cartItems = document.getElementById('cartItems');
    var cartTotal = document.getElementById('cartTotal');
    var cartDropdown = document.getElementById('cartDropdown');
    var cartIcon = document.getElementById('cartIcon');

    function actualizarCarrito() {
        var totalItems = carrito.reduce(function(sum, item) {
            return sum + item.cantidad;
        }, 0);
        cartCount.textContent = totalItems;

        if (carrito.length === 0) {
            cartItems.innerHTML = '<p class="cart-empty">El carrito está vacío</p>';
            cartTotal.textContent = 'Total: $0';
            return;
        }

        var html = '';
        var total = 0;
        carrito.forEach(function(item, index) {
            var subtotal = item.precio * item.cantidad;
            total += subtotal;
            html += `
                <div class="cart-item">
                    <span class="cart-item-name">${item.producto}</span>
                    <span class="cart-item-price">$${item.precio.toLocaleString()}</span>
                    <div class="cart-item-actions">
                        <button class="cart-btn-minus" data-index="${index}">-</button>
                        <span class="cart-item-qty">${item.cantidad}</span>
                        <button class="cart-btn-plus" data-index="${index}">+</button>
                        <button class="cart-btn-remove" data-index="${index}">×</button>
                    </div>
                </div>
            `;
        });

        cartItems.innerHTML = html;
        cartTotal.textContent = 'Total: $' + total.toLocaleString();

        document.querySelectorAll('.cart-btn-plus').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var index = parseInt(this.dataset.index);
                carrito[index].cantidad++;
                actualizarCarrito();
                guardarCarrito();
            });
        });

        document.querySelectorAll('.cart-btn-minus').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var index = parseInt(this.dataset.index);
                if (carrito[index].cantidad > 1) {
                    carrito[index].cantidad--;
                } else {
                    carrito.splice(index, 1);
                }
                actualizarCarrito();
                guardarCarrito();
            });
        });

        document.querySelectorAll('.cart-btn-remove').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var index = parseInt(this.dataset.index);
                carrito.splice(index, 1);
                actualizarCarrito();
                guardarCarrito();
            });
        });
    }

    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarrito() {
        var guardado = localStorage.getItem('carrito');
        if (guardado) {
            carrito = JSON.parse(guardado);
            actualizarCarrito();
        }
    }

    window.agregarAlCarrito = function(producto, precio) {
        var item = carrito.find(function(p) { return p.producto === producto; });
        if (item) {
            item.cantidad++;
        } else {
            carrito.push({ producto: producto, precio: precio, cantidad: 1 });
        }
        actualizarCarrito();
        guardarCarrito();
        alert(producto + ' agregado al carrito');
    };
    window.agregarAlCarritoConCantidad = function(producto, precio, cantidad) {
    if (cantidad <= 0) return;
    
    var item = carrito.find(function(p) { return p.producto === producto; });
    if (item) {
        item.cantidad += cantidad;
    } else {
        carrito.push({ producto: producto, precio: precio, cantidad: cantidad });
    }
    actualizarCarrito();
    guardarCarrito();
    
};

    document.querySelectorAll('.btn-add').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var producto = this.dataset.producto;
            var precio = parseInt(this.dataset.precio);
            agregarAlCarrito(producto, precio);
        });
    });

    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            cartDropdown.classList.toggle('show');
        });
    }

    document.addEventListener('click', function(e) {
        if (cartDropdown) {
            var isClickInsideCart = cartDropdown.contains(e.target) || cartIcon.contains(e.target);
            if (!isClickInsideCart) {
                cartDropdown.classList.remove('show');
            }
        }
    });

    var clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('¿Seguro que quieres vaciar el carrito?')) {
                carrito = [];
                actualizarCarrito();
                guardarCarrito();
            }
        });
    }

    var checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (carrito.length === 0) {
                alert('El carrito está vacío');
                return;
            }
            var total = carrito.reduce(function(sum, item) {
                return sum + (item.precio * item.cantidad);
            }, 0);
            alert('Compra finalizada. Total: $' + total.toLocaleString());
            carrito = [];
            actualizarCarrito();
            guardarCarrito();
            cartDropdown.classList.remove('show');
        });
    }
    if (typeof productos !== 'undefined') {
        generarProductosDestacados();
    } else {
        console.warn('No se encontró la lista de productos');
    }

    function generarProductosDestacados() {
        const productosGrid = document.getElementById('productosDestacados');
        
        if (!productosGrid) return;
        
        // Limpiar el grid
        productosGrid.innerHTML = '';
        
        // Filtrar solo los productos destacados
        const destacados = productos.filter(function(producto) {
            return producto.destacado === true;
        });
        
        // Si no hay productos destacados, mostrar los primeros 3
        const productosAMostrar = destacados.length > 0 ? destacados : productos.slice(0, 3);
        
        console.log('Productos destacados a mostrar:', productosAMostrar.length);
        
        // Generar cada producto destacado
        productosAMostrar.forEach(function(producto) {
            const article = document.createElement('article');
            article.className = 'product-item';
            
            // TODO EL PRODUCTO ES UN ENLACE
            const link = document.createElement('a');
            link.href = 'detalle-producto.html?id=' + producto.id;
            link.className = 'producto-link';
            
            // Imagen
            const img = document.createElement('img');
            img.src = producto.imagen;
            img.alt = producto.nombre;
            
            // Nombre
            const h3 = document.createElement('h3');
            h3.textContent = producto.nombre;
            
            // Precio
            const p = document.createElement('p');
            p.className = 'precio';
            p.textContent = '$' + producto.precio.toLocaleString();
            
            // Agregar todo al enlace
            link.appendChild(img);
            link.appendChild(h3);
            link.appendChild(p);
            
            // Agregar al article
            article.appendChild(link);
            
            // Agregar al grid
            productosGrid.appendChild(article);
        });

        //guardar en localStorage
        document.querySelectorAll('#productosDestacados .producto-link').forEach(function(link) {
            link.addEventListener('click', function(e) {
                // Obtener el ID del producto desde la URL
                const url = new URL(this.href);
                const id = parseInt(url.searchParams.get('id'));
                
                // Buscar el producto en el array
                const producto = productos.find(function(p) {
                    return p.id === id;
                });
                
                if (producto) {
                    // Guardar en localStorage
                    localStorage.setItem('productoDetalle', JSON.stringify(producto));
                    console.log('Producto guardado:', producto.nombre);
                } else {
                    console.error('Producto no encontrado:', id);
                    e.preventDefault();
                }
            });
        });
    }

    cargarCarrito();
});