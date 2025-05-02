document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const usuario = document.getElementById("login-usuario").value.trim();
    const contrasena = document.getElementById("login-contrasena").value.trim();

    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuariosGuardados.find(u =>
      u.usuario === usuario && u.contrasena === contrasena
    );

    if (usuarioEncontrado) {
      Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: `Hola, ${usuarioEncontrado.nombres}`,
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#3085d6'
      }).then(() => {
        window.location.href = 'index.html';
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuario o contraseña incorrectos',
        confirmButtonColor: '#d33'
      });
    }
  });