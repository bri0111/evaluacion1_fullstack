# Especificación de Requisitos del Software (ERS)
## DarkWear - Tienda de Ropa Alternativa
### Versión 1.0

---

## 1. Integrantes
- Britany Carreño
- Enzo Palominos

## 2. Fecha
Septiembre 2026

---

## 3. Propósito
Este documento define los requisitos funcionales y no funcionales para el desarrollo del sitio web de la tienda de ropa alternativa "DarkWear". El proyecto corresponde a la Evaluación Parcial N°1 de la asignatura DSY1104.

## 4. Alcance
El sistema consiste en un sitio web frontend que permite a los usuarios:
- Visualizar un catálogo de productos de ropa alternativa.
- Filtrar productos por categoría.
- Agregar productos a un carrito de compras.
- Contactar a la tienda a través de un formulario.
- Iniciar sesión y registrarse en la plataforma.
- Ver información de la tienda en la página "Nosotros".

---

## 5. Requerimientos Funcionales

| ID | Requerimiento | Prioridad |
|----|---------------|-----------|
| RF-01 | El sistema debe mostrar una página de inicio con productos destacados. | Alta |
| RF-02 | El sistema debe mostrar un catálogo de productos con imágenes, nombre y precio. | Alta |
| RF-03 | El sistema debe permitir filtrar productos por categoría. | Media |
| RF-04 | El sistema debe permitir agregar productos al carrito de compras. | Alta |
| RF-05 | El sistema debe mostrar un formulario de inicio de sesión. | Alta |
| RF-06 | El sistema debe validar el correo y la contraseña en el login. | Alta |
| RF-07 | El sistema debe mostrar un formulario de registro. | Alta |
| RF-08 | El sistema debe validar los campos del formulario de registro. | Alta |
| RF-09 | El sistema debe mostrar un formulario de contacto. | Media |
| RF-10 | El sistema debe validar los campos del formulario de contacto. | Media |
| RF-11 | El sistema debe incluir un video promocional. | Baja |
| RF-12 | El sistema debe mostrar un carrito de compras con resumen de productos. | Alta |
| RF-13 | El sistema debe permitir ver el detalle de cada producto. | Media |

---

## 6. Requerimientos No Funcionales

| ID | Requerimiento | Descripción |
|----|---------------|-------------|
| RNF-01 | Usabilidad | La interfaz debe ser intuitiva y de fácil navegación. |
| RNF-02 | Compatibilidad | El sitio debe funcionar en navegadores modernos (Chrome, Firefox, Edge). |
| RNF-03 | Rendimiento | El sitio debe cargar en menos de 3 segundos. |
| RNF-04 | Mantenibilidad | El código debe estar organizado en carpetas (HTML, CSS, JS, assets). |
| RNF-05 | Escalabilidad | La estructura debe permitir agregar nuevas páginas y funcionalidades. |

---

## 7. Herramientas y Tecnologías

| Herramienta | Versión | Uso |
|-------------|---------|-----|
| HTML | 5 | Estructura del sitio web |
| CSS | 3 | Estilos y diseño visual |
| JavaScript | ES6 | Validaciones e interactividad |
| Git | 2.x | Control de versiones |
| GitHub | - | Repositorio remoto |
| Visual Studio Code | - | Editor de código |

---

## 8. Propuesta del Proyecto

### 8.1 Enfoque
El proyecto fue desarrollado como un frontend estático utilizando HTML semántico, CSS personalizado con temática oscura y JavaScript para las validaciones e interactividad.

### 8.2 Metodología
Se utilizó un enfoque iterativo:
1. Definición de la estructura de carpetas.
2. Creación de las páginas HTML.
3. Aplicación de estilos CSS.
4. Implementación de JavaScript para validaciones y carrito.

### 8.3 Diseño
- Tema oscuro con acento en morado (`#6a1b9a`).
- Tipografía limpia y legible.
- Interfaz responsive para dispositivos móviles.
- Fondo negro con tarjetas en gris oscuro.

### 8.4 Estructura del Proyecto
evaluacion1_fullstack/

 index.html 
 ERS_v1.md
 readme.md

 pages/
 home.html 
 productos.html 
 detalle-producto.html 
 nosotros.html 
 contacto.html 
 login.html 
 registro.html 
 terminos.html
 privacidad.html

 css/
 style.css 

 js/
 main.js 
 productos-data.js 
 productos.js 
 detalle-producto.js 
 login.js 
 registro.js 
 contacto.js 

 assets/
 img/ 
 video/ 


### 8.5 Entregables
- Código fuente completo del frontend.
- Repositorio GitHub público.
- Documento ERS (este documento).
- README.md con instrucciones del proyecto.

---

## 9. Riesgos y Mitigación

| Riesgo | Mitigación |
|--------|------------|
| Problemas de compatibilidad entre navegadores | Probar en Chrome, Firefox y Edge. |
| Errores en las validaciones de formularios | Realizar pruebas exhaustivas. |
| Pérdida de código | Usar Git con commits frecuentes. |

---

## 10. Aprobaciones

| Rol | Nombre | Fecha |
|-----|--------|-------|
| Estudiante | Britany Carreño | Septiembre 2026 |
| Estudiante | Enzo Palominos | Septiembre 2026 |
| Docente | Anyelo Casteyon | Septiembre 2026 |

---

## 11. Historial de Versiones

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0 | Septiembre 2026 | Creación inicial del documento |

