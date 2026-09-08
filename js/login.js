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
            // Solo permite dominios: @duoc.cl, @profesor.duoc.cl, @gmail.com
            var emailPattern = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

            if (!email.value.trim()) {
                emailError.textContent = 'El correo es obligatorio.';
                valid = false;
            } else if (!emailPattern.test(email.value.trim())) {
                emailError.textContent = 'Ingresa un correo válido (ej: @duoc.cl, @gmail.com).';
                valid = false;
            } else {
                emailError.textContent = '';
            }

            var password = document.getElementById('password');
            var passwordError = document.getElementById('passwordError');
            // Entre 4 a 10 caracteres
            if (!password.value.trim()) {
                passwordError.textContent = 'La contraseña es obligatoria.';
                valid = false;
            } else if (password.value.trim().length < 4 || password.value.trim().length > 10) {
                passwordError.textContent = 'La contraseña debe tener entre 4 y 10 caracteres.';
                valid = false;
            } else {
                passwordError.textContent = '';
            }

            if (valid) {
                redirectMessage.style.display = 'block';
                loginBtn.disabled = true;
                loginBtn.textContent = 'Cargando...';

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
