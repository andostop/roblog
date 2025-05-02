document.getElementById("registro-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const usuario = document.getElementById("nuevo-usuario").value.trim();
  const contrasena = document.getElementById("nueva-contrasena").value.trim();
  const nombres = document.getElementById("nombres").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const correo = document.getElementById("correo").value.trim();

  const errores = [];

  const regexUsuario = /^[a-zA-Z0-9]+$/;
  const regexContrasena = /^[a-zA-Z0-9\-\.]+$/;
  const regexNombreApellido = /^[a-zA-Z\s]+$/;
  const regexCorreo = /^[a-zA-Z0-9\-\.]+@[a-zA-Z0-9\-\.]+$/;

  if (!regexUsuario.test(usuario)) errores.push("El nombre de usuario solo debe contener letras y números.");
  if (!regexContrasena.test(contrasena)) errores.push("La contraseña solo debe contener letras, números, guiones o puntos.");
  if (contrasena.length > 8) errores.push("La contraseña no debe superar los 8 caracteres.");
  if (!regexNombreApellido.test(nombres)) errores.push("Los nombres solo deben contener letras.");
  if (!regexNombreApellido.test(apellidos)) errores.push("Los apellidos solo deben contener letras.");
  if (!regexCorreo.test(correo)) errores.push("El correo electrónico no es válido.");

  if (errores.length > 0) {
    Swal.fire({
      icon: 'error',
      title: 'Errores en el formulario',
      html: errores.map(e => `<p>❌ ${e}</p>`).join(""),
      confirmButtonText: 'Revisar'
    });
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const existe = usuarios.some(u => u.usuario === usuario);

  if (existe) {
    Swal.fire({
      icon: 'error',
      title: 'Nombre de usuario en uso',
      text: 'Ese nombre de usuario ya está registrado.'
    });
  } else {
    usuarios.push({ usuario, contrasena, nombres, apellidos, correo });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    Swal.fire({
      icon: 'success',
      title: '¡Registro exitoso!',
      text: 'Usuario registrado correctamente.',
      confirmButtonText: 'Continuar'
    }).then(() => {
      window.location.href = "inicio.html";
    });
  }
});
