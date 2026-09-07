
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de productos cargada');

    // Verificamos que la lista de productos existe
    if (typeof productos === 'undefined') {
        console.error('Error: No se encontró la lista de productos');
        return;
    }

    // generamos productos
    const productosGrid = document.getElementById('productosGrid');
    
    if (productosGrid) {
       //limpiamos el grid
        productosGrid.innerHTML = '';
        
        // Generar cada producto
        productos.forEach(function(producto) {
            const article = document.createElement('article');
            article.className = 'product-item';
            article.dataset.categoria = producto.categoria;
            article.dataset.id = producto.id;
            
            // Crear el enlace del producto
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
            
            // Agregar elementos al enlace
            link.appendChild(img);
            link.appendChild(h3);
            link.appendChild(p);
            
            // Botón agregar al carrito
            
            
            // Agregar todo al article
            article.appendChild(link);
            
            
            // Agregar al grid
            productosGrid.appendChild(article);
        });
    }

    // ========== FILTROS ==========
    var filterButtons = document.querySelectorAll('.filter-btn');
    var products = document.querySelectorAll('.product-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                filterButtons.forEach(function(b) {
                    b.classList.remove('active');
                });
                this.classList.add('active');

                var category = this.dataset.categoria;

                products.forEach(function(product) {
                    if (category === 'todos') {
                        product.style.display = 'flex';
                    } else if (product.dataset.categoria === category) {
                        product.style.display = 'flex';
                    } else {
                        product.style.display = 'none';
                    }
                });
            });
        });
    }

    //clic en producto guardar en localStorage
    document.querySelectorAll('.producto-link').forEach(function(link) {
        link.addEventListener('click', function(e) {
            // Obtener el ID del producto desde la URL
            const url = new URL(this.href);
            const id = parseInt(url.searchParams.get('id'));
            
            // Buscar el producto en la lista
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
});