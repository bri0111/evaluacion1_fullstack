


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registroForm');
    const btnRegistro = document.getElementById('btnRegistro');

    // Elementos del formulario
    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');
    const password = document.getElementById('password');
    const passwordConfirm = document.getElementById('passwordConfirm');
    const terminos = document.getElementById('terminos');

    // Elementos de error
    const nombreError = document.getElementById('nombreError');
    const apellidoError = document.getElementById('apellidoError');
    const emailError = document.getElementById('emailError');
    const telefonoError = document.getElementById('telefonoError');
    const passwordError = document.getElementById('passwordError');
    const passwordConfirmError = document.getElementById('passwordConfirmError');
    const terminosError = document.getElementById('terminosError');

    

    // Validar nombre
    nombre.addEventListener('input', function () {
        if (this.value.trim().length < 2) {
            this.classList.add('error');
            nombreError.textContent = 'El nombre debe tener al menos 2 caracteres';
        } else {
            this.classList.remove('error');
            nombreError.textContent = '';
        }
    });

    // Validar apellido
    apellido.addEventListener('input', function () {
        if (this.value.trim().length < 2) {
            this.classList.add('error');
            apellidoError.textContent = 'El apellido debe tener al menos 2 caracteres';
        } else {
            this.classList.remove('error');
            apellidoError.textContent = '';
        }
    });

    // Validar email
    email.addEventListener('input', function () {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.value.trim())) {
            this.classList.add('error');
            emailError.textContent = 'Ingresa un correo electrónico válido';
        } else {
            this.classList.remove('error');
            emailError.textContent = '';
        }
    });

    // Validar teléfono (opcional)
    telefono.addEventListener('input', function () {
        if (this.value.trim() && !/^[\+\d\s\-]{8,15}$/.test(this.value.trim())) {
            this.classList.add('error');
            telefonoError.textContent = 'Ingresa un número de teléfono válido';
        } else {
            this.classList.remove('error');
            telefonoError.textContent = '';
        }
    });

   //contraseña

    const strengthBars = [
        document.getElementById('strengthBar1'),
        document.getElementById('strengthBar2'),
        document.getElementById('strengthBar3'),
        document.getElementById('strengthBar4')
    ];
    const passwordText = document.getElementById('passwordText');

    password.addEventListener('input', function () {
        const value = this.value;
        let strength = 0;

        // validamos la psw
        if (value.length >= 8) strength++;
        if (/[a-z]/.test(value) && /[A-Z]/.test(value)) strength++;
        if (/\d/.test(value)) strength++;
        if (/[^a-zA-Z0-9]/.test(value)) strength++;

        // Actualizar barras
        strengthBars.forEach(function (bar, index) {
            bar.className = 'bar';
            if (index < strength) {
                bar.classList.add('active');
                if (strength <= 2) {
                    bar.classList.add('weak');
                } else if (strength === 3) {
                    bar.classList.add('medium');
                } else {
                    bar.classList.add('strong');
                }
            }
        });

        // Actualizar texto
        const texts = ['Muy débil', 'Débil', 'Media', 'Fuerte', 'Muy fuerte'];
        passwordText.textContent = value.length > 0 ? texts[strength] : 'Mínimo 8 caracteres';
        passwordText.style.color = strength <= 2 ? '#cc3333' : strength === 3 ? '#ffaa00' : '#33cc33';

        // Validar contraseña
        if (value.length > 0 && value.length < 8) {
            this.classList.add('error');
            passwordError.textContent = 'La contraseña debe tener al menos 8 caracteres';
        } else {
            this.classList.remove('error');
            passwordError.textContent = '';
        }

        // Validar confirmación si ya tiene texto
        if (passwordConfirm.value.length > 0) {
            validarConfirmacion();
        }
    });

    // repita la psw

    function validarConfirmacion() {
        if (password.value !== passwordConfirm.value) {
            passwordConfirm.classList.add('error');
            passwordConfirmError.textContent = 'Las contraseñas no coinciden';
            return false;
        } else {
            passwordConfirm.classList.remove('error');
            passwordConfirmError.textContent = '';
            return true;
        }
    }

    passwordConfirm.addEventListener('input', validarConfirmacion);

    

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validar todos los campos
        let isValid = true;

        // Nombre
        if (nombre.value.trim().length < 2) {
            nombre.classList.add('error');
            nombreError.textContent = 'El nombre debe tener al menos 2 caracteres';
            isValid = false;
        }

        // Apellido
        if (apellido.value.trim().length < 2) {
            apellido.classList.add('error');
            apellidoError.textContent = 'El apellido debe tener al menos 2 caracteres';
            isValid = false;
        }

        // Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            email.classList.add('error');
            emailError.textContent = 'Ingresa un correo electrónico válido';
            isValid = false;
        }

        // Contraseña
        if (password.value.length < 8) {
            password.classList.add('error');
            passwordError.textContent = 'La contraseña debe tener al menos 8 caracteres';
            isValid = false;
        }

        // Confirmar contraseña
        if (!validarConfirmacion()) {
            isValid = false;
        }

        // Términos
        if (!terminos.checked) {
            terminosError.textContent = 'Debes aceptar los términos y condiciones';
            isValid = false;
        } else {
            terminosError.textContent = '';
        }

        if (!isValid) {
            showToast('error', 'Error', 'Por favor, corrige los errores en el formulario');
            return;
        }

        

        btnRegistro.disabled = true;
        btnRegistro.textContent = 'Creando cuenta...';

        // Simular petición al servidor
        setTimeout(function () {
            // Guardar usuario en localStorage (simulación)
            const usuario = {
                nombre: nombre.value.trim(),
                apellido: apellido.value.trim(),
                email: email.value.trim(),
                telefono: telefono.value.trim(),
                fechaRegistro: new Date().toISOString()
            };

            localStorage.setItem('usuarioDarkWear', JSON.stringify(usuario));

            // Mostrar mensaje de éxito
            showToast('success', '¡Cuenta creada!',
                'Bienvenido ' + usuario.nombre + '. Ya puedes iniciar sesión.');

            btnRegistro.disabled = false;
            btnRegistro.textContent = 'Crear cuenta';

            // Redirigir después de 2 segundos
            setTimeout(function () {
                window.location.href = 'login.html';
            }, 2500);

        }, 1500);
    });

    // ========== TOAST NOTIFICATION ==========

    function showToast(type, title, message) {
        const toast = document.getElementById('toast');
        const toastTitle = document.getElementById('toastTitle');
        const toastMessage = document.getElementById('toastMessage');

        toast.className = 'toast show ' + type;
        toastTitle.textContent = title;
        toastMessage.textContent = message;

        // Ocultar después de 3 segundos
        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(function () {
            toast.classList.remove('show');
        }, 3000);
    }
});
