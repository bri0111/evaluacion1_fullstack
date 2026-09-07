document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('loginForm');
    var redirectMessage = document.getElementById('redirectMessage');
    var loginBtn = document.getElementById('loginBtn');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var valid = true;

            var email = document.getElementById('email');
            var emailError = document.getElementById('emailError');
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!email.value.trim()) {
                emailError.textContent = 'El correo es obligatorio.';
                valid = false;
            } else if (!emailPattern.test(email.value.trim())) {
                emailError.textContent = 'Ingresa un correo válido.';
                valid = false;
            } else {
                emailError.textContent = '';
            }

            var password = document.getElementById('password');
            var passwordError = document.getElementById('passwordError');

            if (!password.value.trim()) {
                passwordError.textContent = 'La contraseña es obligatoria.';
                valid = false;
            } else if (password.value.trim().length < 6) {
                passwordError.textContent = 'Mínimo 6 caracteres.';
                valid = false;
            } else {
                passwordError.textContent = '';
            }

            // ============================================
            // SI TODOS LOS CAMPOS SON VÁLIDOS
            // ============================================
            if (valid) {
                // Mostrar mensaje de redirección
                redirectMessage.style.display = 'block';
                loginBtn.disabled = true;
                loginBtn.textContent = 'Cargando...';

                // Redirigir después de 1 segundo (para que se vea el mensaje)
                setTimeout(function() {
                    window.location.href = '../index.html';
                }, 1000);
            }
        });

        document.getElementById('email').addEventListener('input', function() {
            document.getElementById('emailError').textContent = '';
        });
        document.getElementById('password').addEventListener('input', function() {
            document.getElementById('passwordError').textContent = '';
        });
    }
});