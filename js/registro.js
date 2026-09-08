document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registroForm');
    const btnRegistro = document.getElementById('btnRegistro');

    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');
    const password = document.getElementById('password');
    const passwordConfirm = document.getElementById('passwordConfirm');
    const terminos = document.getElementById('terminos');

    const nombreError = document.getElementById('nombreError');
    const apellidoError = document.getElementById('apellidoError');
    const emailError = document.getElementById('emailError');
    const telefonoError = document.getElementById('telefonoError');
    const passwordError = document.getElementById('passwordError');
    const passwordConfirmError = document.getElementById('passwordConfirmError');
    const terminosError = document.getElementById('terminosError');

    // Solo permite dominios: @duoc.cl, @profesor.duoc.cl, @gmail.com
    const emailPattern = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

    nombre.addEventListener('input', function () {
        if (this.value.trim().length < 2) {
            this.classList.add('error');
            nombreError.textContent = 'El nombre debe tener al menos 2 caracteres';
        } else {
            this.classList.remove('error');
            nombreError.textContent = '';
        }
    });

    apellido.addEventListener('input', function () {
        if (this.value.trim().length < 2) {
            this.classList.add('error');
            apellidoError.textContent = 'El apellido debe tener al menos 2 caracteres';
        } else {
            this.classList.remove('error');
            apellidoError.textContent = '';
        }
    });

    email.addEventListener('input', function () {
        if (!emailPattern.test(this.value.trim())) {
            this.classList.add('error');
            emailError.textContent = 'Ingresa un correo válido (ej: @duoc.cl, @gmail.com)';
        } else {
            this.classList.remove('error');
            emailError.textContent = '';
        }
    });

    telefono.addEventListener('input', function () {
        if (this.value.trim() && !/^[\+\d\s\-]{8,15}$/.test(this.value.trim())) {
            this.classList.add('error');
            telefonoError.textContent = 'Ingresa un número de teléfono válido';
        } else {
            this.classList.remove('error');
            telefonoError.textContent = '';
        }
    });

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

        if (value.length >= 8) strength++;
        if (/[a-z]/.test(value) && /[A-Z]/.test(value)) strength++;
        if (/\d/.test(value)) strength++;
        if (/[^a-zA-Z0-9]/.test(value)) strength++;

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

        const texts = ['Muy débil', 'Débil', 'Media', 'Fuerte', 'Muy fuerte'];
        passwordText.textContent = value.length > 0 ? texts[strength] : 'Mínimo 8 caracteres';
        passwordText.style.color = strength <= 2 ? '#cc3333' : strength === 3 ? '#ffaa00' : '#33cc33';

        if (value.length > 0 && value.length < 8) {
            this.classList.add('error');
            passwordError.textContent = 'La contraseña debe tener al menos 8 caracteres';
        } else {
            this.classList.remove('error');
            passwordError.textContent = '';
        }

        if (passwordConfirm.value.length > 0) {
            validarConfirmacion();
        }
    });

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

        let isValid = true;

        if (nombre.value.trim().length < 2) {
            nombre.classList.add('error');
            nombreError.textContent = 'El nombre debe tener al menos 2 caracteres';
            isValid = false;
        }

        if (apellido.value.trim().length < 2) {
            apellido.classList.add('error');
            apellidoError.textContent = 'El apellido debe tener al menos 2 caracteres';
            isValid = false;
        }

        if (!emailPattern.test(email.value.trim())) {
            email.classList.add('error');
            emailError.textContent = 'Ingresa un correo válido (ej: @duoc.cl, @gmail.com)';
            isValid = false;
        }

        if (password.value.length < 8) {
            password.classList.add('error');
            passwordError.textContent = 'La contraseña debe tener al menos 8 caracteres';
            isValid = false;
        }

        if (!validarConfirmacion()) {
            isValid = false;
        }

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

        setTimeout(function () {
            const usuario = {
                nombre: nombre.value.trim(),
                apellido: apellido.value.trim(),
                email: email.value.trim(),
                telefono: telefono.value.trim(),
                fechaRegistro: new Date().toISOString()
            };

            localStorage.setItem('usuarioDarkWear', JSON.stringify(usuario));

            showToast('success', '¡Cuenta creada!',
                'Bienvenido ' + usuario.nombre + '. Ya puedes iniciar sesión.');

            btnRegistro.disabled = false;
            btnRegistro.textContent = 'Crear cuenta';

            setTimeout(function () {
                window.location.href = 'login.html';
            }, 2500);

        }, 1500);
    });

    function showToast(type, title, message) {
        const toast = document.getElementById('toast');
        const toastTitle = document.getElementById('toastTitle');
        const toastMessage = document.getElementById('toastMessage');

        toast.className = 'toast show ' + type;
        toastTitle.textContent = title;
        toastMessage.textContent = message;

        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(function () {
            toast.classList.remove('show');
        }, 3000);
    }
});
