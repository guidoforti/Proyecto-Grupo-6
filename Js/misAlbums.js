const nombreUsuario = localStorage.getItem("nombreUsuario");
const usuario = document.getElementById("usuario");

const botonCerrarSesion = document.getElementById("botonCerrarSesion");
const ingreso = localStorage.getItem("ingreso");

if (ingreso !== "false") {
    usuario.textContent = nombreUsuario;
    botonCerrarSesion.textContent = "Cerrar sesión";
}

if(ingreso === "false"){
  const iperfil = document.getElementById("iperfil");
  iperfil.className = "borrarimg";
}


/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
const albumsFavoritos = usuarioLogueado.albumsFavs;
const contenedor = document.querySelector(".contenedorAlbums");


function estaEnFavoritos(albumId) {
  return usuarioLogueado.albumsFavs.some(favAlbum => favAlbum.id === albumId);
}

function quitarAlbumFavoritos(albumId) {
  usuarioLogueado.albumsFavs = usuarioLogueado.albumsFavs.filter(favAlbum => favAlbum.id !== albumId);
  localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogueado));
  
}

albumsFavoritos.map((album) => {
  const article = document.createElement("article");
  article.className = "album";
  article.id = album.id;

  // Creas un nuevo elemento a
  const a = document.createElement("a");

  // Creas un nuevo elemento img y le asignas la fuente desde tu objeto
  const img = document.createElement("img");
  img.className = "imgAlbum";
  img.src = album.img;

  // Añades el img al a
  a.appendChild(img);

  // Creas un nuevo elemento span
  const span = document.createElement("span");
  
  span.className = "material-symbols-outlined fav"; // ¿? preguntar si la id esta en favoritos para darle el estilo correspondiente y la funcion correspondiente
  span.innerHTML = "grade"; // Puedes cambiar esto si necesitas un valor dinámico
  
  //EVALUO QUE SI ESTA EN FAVORITOS QUEDE MARCADA LA ESTRELLA
  if (estaEnFavoritos(album.id)) {
    span.classList.add("material-symbols-rounded");
  }
  //añadir event listener on click y validar si esta en favoritos, para darle la funcion correspondiente

  // Añades el a y el span al article
  article.appendChild(a);
  article.appendChild(span);

  // Finalmente, añades el article al contenedor
  contenedor.appendChild(article);

  //AGREGO LA FUNCION ALAS ESTRELLAS
  span.addEventListener("click", function () {
    quitarAlbumFavoritos(album.id);
    span.classList.remove("material-symbols-rounded");
    contenedor.removeChild(article);
  });


  //AGREGO LA FUNCION PARA QUE SE VAYA AGREGANDO AL COSTADO EL ALBUM ESCUCHANDO
  img.addEventListener("click", function () {
    
    const articuloAlbumEscuchando = document.createElement("article");
  
    articuloAlbumEscuchando.className = "albumDescripcion";
    const aDeArticuloEcuchando = document.createElement("a");
    aDeArticuloEcuchando.href = "musicaSonando.html";

    const imgDeArticuloEscuchando = document.createElement("img");
    imgDeArticuloEscuchando.className = "imgAlbumDescripcion";
    imgDeArticuloEscuchando.src = album.img;

    aDeArticuloEcuchando.appendChild(imgDeArticuloEscuchando);
    articuloAlbumEscuchando.appendChild(aDeArticuloEcuchando);

    const albumDescripcion = document.querySelector(".cancionReproduciendo");
    albumDescripcion.style.animation = "fadeIn 2s";

    while (albumDescripcion.firstChild) {
      albumDescripcion.removeChild(albumDescripcion.lastChild);
    }
    albumDescripcion.appendChild(articuloAlbumEscuchando);

    const descripcionDelAlbum = document.createElement("article");
    descripcionDelAlbum.className = "descripcionCancion";
    const pDescripcion = document.createElement("p");
    pDescripcion.id = "cancion-sonando";
    pDescripcion.innerHTML = "Estas escuchando: " + album.nombre;

    descripcionDelAlbum.appendChild(pDescripcion);
    albumDescripcion.appendChild(descripcionDelAlbum);

    localStorage.setItem("albumEscuchando", JSON.stringify(album));
  });
});




const cerrarSesion = document.querySelector(".cerrar-sesion");
cerrarSesion.addEventListener("click", function(event){
    
   

    const usuarioModificado = usuarioLogueado;

    for ( i = 0; i< usuarios.length ; i++) {

      if (usuarios[i].usuario === usuarioLogueado.usuario) {
        usuarios[i].remove;
        usuarios[i] = usuarioModificado;
        localStorage.removeItem("usuarioLogueado");
        break;
      }
    }
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    const cerroSesion = localStorage.setItem("ingreso", false);
    window.location.href = "Index.html";
})