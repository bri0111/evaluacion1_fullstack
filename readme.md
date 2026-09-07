# DarkWear - Tienda de Ropa Alternativa

## Descripción del proyecto
DarkWear es una tienda en línea de ropa con estilo alternativo. El proyecto fue desarrollado como parte de la Evaluación Parcial N°1 de la asignatura DSY1104.

## Tecnologías utilizadas
- HTML5
- CSS3
- JavaScript (vanilla)
- Git & GitHub

## Estructura
evaluacion1_fullstack/

 index.html (página de bienvenida )
 ERS_v1.md (documento de requisitos del software)
 readme.md (presentacion del proyecto)

 pages/
 home.html (página principal)
 productos.html (catálogo de productos)
 detalle-producto.html (detalle individual de cada producto)
 nosotros.html (sobre la tienda y ubicación)
 contacto.html (formulario de contacto)
 login.html (inicio de sesión)
 registro.html (creación de cuenta)
 terminos.html (terminos y condiciones de uso)
 privacidad.html (politica de privacidad)

 css/
 style.css (todos los estilos del sitio)

 js/
 main.js (carrito, navegación, funciones globales)
 productos-data.js (base de datos simulada de productos)
 productos.js (lógica de la página de productos y filtros)
 detalle-producto.js (lógica de la página de detalle)
 login.js (validación del login)
 registro.js (validación del registro)
 contacto.js (validación del formulario de contacto)

 assets/
 img/ (imágenes de productos, logo, etc.)
 video/ (video promocional)


## Funcionalidades principales
- **Página de inicio**: muestra un video promocional y productos destacados.
- **Catálogo de productos**: permite filtrar por categoría (camperas, remeras, pantalones, accesorios, otros).
- **Detalle de producto**: muestra información completa, opción de talla y cantidad para agregar al carrito.
- **Carrito de compras**: se guarda automáticamente en el navegador (localStorage). Se puede modificar la cantidad o eliminar productos.
- **Inicio de sesión**: validación de correo y contraseña (mínimo 6 caracteres). Redirige al inicio.
- **Registro de usuarios**: validación de nombre, apellido, correo, contraseña (mínimo 8 caracteres con indicador de fortaleza), confirmación de contraseña y aceptación de términos.
- **Contacto**: validación de nombre, correo y mensaje antes de enviar.
- **Página "Nosotros"**: incluye información de la tienda y un mapa de ubicación.
- **Términos y condiciones**: Página informativa con las condiciones de uso del sitio web.
- **Política de privacidad**: Página informativa sobre la recopilación y uso de datos personales.

## Validaciones implementadas
### Login
- Correo electrónico: campo obligatorio y formato válido.
- Contraseña: campo obligatorio y mínimo 6 caracteres.

### Registro
- Nombre y apellido: obligatorios, mínimo 2 caracteres.
- Correo electrónico: obligatorio y formato válido.
- Contraseña: mínimo 8 caracteres, con indicador visual de fortaleza.
- Confirmación de contraseña: debe coincidir con la contraseña.
- Términos y condiciones: obligatorio aceptarlos.

### Contacto
- Nombre: obligatorio, mínimo 2 caracteres.
- Correo electrónico: obligatorio y formato válido.
- Mensaje: obligatorio, mínimo 5 caracteres.

## Cómo probar el login
- **Correo**: cualquier correo con formato válido (ej: usuario@darkwear.com)
- **Contraseña**: mínimo 6 caracteres (ej: 123456)

## Cómo ejecutar el proyecto
1. Clonar el repositorio:
2. Abrir el archivo `index.html` en el navegador (redirige automáticamente a `home.html`).
3. También se puede abrir directamente `pages/home.html`.

## Autores
- Estudiantes DSY1104: Britany carreño y Enzo Palominos

## Fecha
Septiembre 2026