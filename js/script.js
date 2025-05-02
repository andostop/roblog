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

    // SweetAlert de éxito
    Swal.fire({
      icon: 'success',
      title: 'Comentario agregado',
      text: 'Tu comentario se ha agregado correctamente.',
      confirmButtonColor: '#00aaff',
    });
  } else {
    // SweetAlert de error si el comentario está vacío
    Swal.fire({
      icon: 'error',
      title: 'Comentario vacío',
      text: 'Por favor, escribe un comentario.',
      confirmButtonColor: '#f44336',
    });
  }
}

// Cargar comentarios de localStorage al iniciar la página
window.onload = function () {
  // Cargar publicaciones previas desde el localStorage
  cargarPublicaciones();
  
  // Cargar comentarios previos de cada publicación
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

// Función para cargar las publicaciones en la página principal
function cargarPublicaciones() {
  const storedPost = JSON.parse(localStorage.getItem("nueva-publicacion"));
  if (storedPost) {
    const postContainer = document.getElementById("noticias");
    const postElement = crearPostElemento(storedPost);
    postContainer.appendChild(postElement);
  }
}

// Función para crear el elemento de la publicación
function crearPostElemento(post) {
  const postElement = document.createElement("div");
  postElement.classList.add("post");

  const postTitle = document.createElement("h4");
  postTitle.textContent = post.titulo;
  
  const postCategory = document.createElement("p");
  postCategory.classList.add("categoria");
  postCategory.textContent = `${post.categoria} | Autor: ${post.autor}`;
  
  const postContent = document.createElement("p");
  postContent.textContent = post.contenido;

  // Elementos de comentario
  const comentariosSection = document.createElement("div");
  comentariosSection.classList.add("comentarios");

  const comentarioList = document.createElement("ul");
  comentarioList.id = `comentarios-${post.titulo}`;

  const comentarioInput = document.createElement("input");
  comentarioInput.type = "text";
  comentarioInput.placeholder = "Agrega un comentario...";

  const comentarioButton = document.createElement("button");
  comentarioButton.textContent = "Comentar";
  comentarioButton.onclick = function () {
    agregarComentario(post.titulo);
  };

  comentariosSection.appendChild(comentarioList);
  comentariosSection.appendChild(comentarioInput);
  comentariosSection.appendChild(comentarioButton);

  // Agregar elementos al contenedor de la publicación
  postElement.appendChild(postTitle);
  postElement.appendChild(postCategory);
  postElement.appendChild(postContent);
  postElement.appendChild(comentariosSection);

  return postElement;
}

// Publicar una nueva noticia
document.getElementById("btn-publicar").addEventListener("click", function () {
  const titulo = document.getElementById("post-title").value.trim();
  const contenido = document.getElementById("post-content").value.trim();
  const categoria = document.getElementById("post-category").value;

  if (titulo && contenido && categoria) {
    const newPost = {
      titulo: titulo,
      contenido: contenido,
      categoria: categoria,
      autor: "invitado"
    };

    // Guardar publicación en localStorage
    localStorage.setItem("nueva-publicacion", JSON.stringify(newPost));

    // Mostrar la publicación en la página
    const postElement = crearPostElemento(newPost);
    document.getElementById("noticias").prepend(postElement); // Añadir la publicación arriba de las demás

    // SweetAlert de éxito
    Swal.fire({
      icon: 'success',
      title: 'Publicación agregada',
      text: 'Tu publicación ha sido agregada correctamente.',
      confirmButtonColor: '#00aaff',
    });

    // Limpiar formulario después de publicar
    document.getElementById("post-title").value = "";
    document.getElementById("post-content").value = "";
    document.getElementById("post-category").value = "";
  } else {
    // SweetAlert de error si algún campo está vacío
    Swal.fire({
      icon: 'error',
      title: 'Campos incompletos',
      text: 'Por favor, completa todos los campos antes de publicar.',
      confirmButtonColor: '#f44336',
    });
  }
});

  