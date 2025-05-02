// Importando SweetAlert
import Swal from 'sweetalert2';

// Función para agregar comentario
function agregarComentario(postIndex) {
  const comentarioInput = document.getElementById(`comentario-input-${postIndex}`);
  const comentario = comentarioInput.value.trim();
  if (comentario) {
    const comentariosList = document.getElementById(`comentarios-${postIndex}`);
    const newComment = document.createElement("li");
    newComment.textContent = comentario;
    comentariosList.appendChild(newComment);
    comentarioInput.value = "";

    // Almacenar comentarios en localStorage
    const storedComments = JSON.parse(localStorage.getItem(`comentarios-post-${postIndex}`)) || [];
    storedComments.push(comentario);
    localStorage.setItem(`comentarios-post-${postIndex}`, JSON.stringify(storedComments));
  }
}

// Cargar comentarios de localStorage al iniciar la página
window.onload = function () {
  for (let i = 0; i < 6; i++) {
    const storedComments = JSON.parse(localStorage.getItem(`comentarios-post-${i}`)) || [];
    const comentariosList = document.getElementById(`comentarios-${i}`);
    storedComments.forEach(comment => {
      const newComment = document.createElement("li");
      newComment.textContent = comment;
      comentariosList.appendChild(newComment);
    });
  }
};

// Función para publicar una nueva noticia con SweetAlert
document.getElementById("btn-publicar").addEventListener("click", function () {
  const titulo = document.getElementById("post-title").value.trim();
  const contenido = document.getElementById("post-content").value.trim();
  const categoria = document.getElementById("post-category").value;
  
  if (titulo && contenido && categoria) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Estás a punto de publicar esta noticia.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, publicar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const newPost = {
          titulo: titulo,
          contenido: contenido,
          categoria: categoria,
          autor: "invitado"
        };
        
        // Guardar publicación en localStorage (solo una simulación de guardado)
        localStorage.setItem("nueva-publicacion", JSON.stringify(newPost));
        Swal.fire(
          'Publicado!',
          'Tu publicación ha sido agregada.',
          'success'
        );

        // Limpiar el formulario
        document.getElementById("post-title").value = "";
        document.getElementById("post-content").value = "";
        document.getElementById("post-category").value = "";
      }
    });
  } else {
    Swal.fire(
      'Error!',
      'Todos los campos son necesarios.',
      'error'
    );
  }
});
