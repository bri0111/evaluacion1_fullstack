document.addEventListener('DOMContentLoaded', function() {
    var contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var valid = true;

            var nombre = document.getElementById('nombre');
            var nombreError = document.getElementById('nombreError');
            if (!nombre.value.trim()) {
                nombreError.textContent = 'El nombre es obligatorio.';
                valid = false;
            } else if (nombre.value.trim().length < 2) {
                nombreError.textContent = 'El nombre debe tener al menos 2 caracteres.';
                valid = false;
            } else {
                nombreError.textContent = '';
            }

            var emailC = document.getElementById('emailContacto');
            var emailCError = document.getElementById('emailContactoError');
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailC.value.trim()) {
                emailCError.textContent = 'El correo es obligatorio.';
                valid = false;
            } else if (!emailPattern.test(emailC.value.trim())) {
                emailCError.textContent = 'Ingresa un correo válido.';
                valid = false;
            } else {
                emailCError.textContent = '';
            }

            var mensaje = document.getElementById('mensaje');
            var mensajeError = document.getElementById('mensajeError');
            if (!mensaje.value.trim()) {
                mensajeError.textContent = 'El mensaje es obligatorio.';
                valid = false;
            } else if (mensaje.value.trim().length < 5) {
                mensajeError.textContent = 'El mensaje debe tener al menos 5 caracteres.';
                valid = false;
            } else {
                mensajeError.textContent = '';
            }

            if (valid) {
                alert('Mensaje enviado correctamente (simulación)');
                contactForm.reset();
            }
        });

        document.getElementById('nombre').addEventListener('input', function() {
            document.getElementById('nombreError').textContent = '';
        });
        document.getElementById('emailContacto').addEventListener('input', function() {
            document.getElementById('emailContactoError').textContent = '';
        });
        document.getElementById('mensaje').addEventListener('input', function() {
            document.getElementById('mensajeError').textContent = '';
        });
    }
});