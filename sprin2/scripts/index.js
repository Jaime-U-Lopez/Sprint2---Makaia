import { arrayListVideosInicial } from "../data/data.js";

const arrayListVideos = arrayListVideosInicial.slice();

const lookVideos = (listaVideos, contenedor) => {
  //para limpiar el contenedor de lo que tenga en html
  contenedor.innerHTML = "";

  listaVideos.forEach((videos) => {
    const article = document.createElement("article");
    article.classList.add("Card");
    article.innerHTML = `
    <figure class="card__video">
    <button class="card__delete" name='${videos.id}'> ❌</button>
    <button id="card__edit" class="card__edit" name='${videos.id}'>🖊 </button>
     
        <video class="card__Vdo" id="${videos.id} "  controls>
        <source name="${videos.id}  " src="${videos.link}">

          Your browser does not support the video tag.
          </video >
          
                 <h4>  ${videos.title} </h4>
                 <p> ${videos.name} </p>
                 <p> ${videos.adiciones} </p>
             
      </figure>
              
        `;

    contenedor.appendChild(article);
  });
};

const main = document.querySelector(".main");
const contenedorCards = document.getElementById("contenedorCards");

let listaVideos = sessionStorage.getItem("listVideos")
  ? JSON.parse(sessionStorage.getItem("listVideos"))
  : [];

//recargar el array de localStorage iniciando la pagina
document.addEventListener("DOMContentLoaded", () => {
  if (listaVideos.length === 0) {
    sessionStorage.setItem("listVideos", JSON.stringify(arrayListVideos));
    listaVideos = JSON.parse(sessionStorage.getItem("listVideos"));
    console.log(listaVideos);
  }
  lookVideos(listaVideos, contenedorCards);
});

//Funcionamiento a los botones de filtrado

//1. Capturar los botones
const btnAll = document.getElementById("all");
const btnMusic = document.getElementById("music");
const btnDeveloper = document.getElementById("developer");
const btnDiseño = document.getElementById("diseño");

//2. Vamos a declarar un array donde cada elemento sea el btn que hemos capturado

const filterButtons = [btnAll, btnMusic, btnDeveloper, btnDiseño];

//3. Recorrer el array filterButtons para escuchar el click de ellos.

filterButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    console.log(event.target.id);

    let videoFiltrados = [];

    if (button.id === "all") {
      videoFiltrados = listaVideos;
    } else {
      videoFiltrados = listaVideos.filter(
        (video) => video.category === button.id
      );
    }

    lookVideos(videoFiltrados, contenedorCards);
  });
});

document.addEventListener("click", (event) => {
  const { target } = event;

  if (target.classList.contains("card__Vdo")) {
    console.log(target.id);
    sessionStorage.setItem("seeVideo", JSON.stringify(target.id));
    window.location.href = "./PageVideo.html";
  }

  //Condicional para eliminar un elemento
  if (target.classList.contains("card__delete")) {
    Swal.fire({
      title: "¿Está usted seguro de eliminar?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");

        //Encontrar la posición del elemento que queremos borrar dentro del array
        const idVideoDelete = parseInt(target.name);

        const positionVideo = listaVideos.findIndex(
          (video) => video.id === idVideoDelete
        );

        //Elimina el personaje
        arrayListVideos.splice(positionVideo, 1);

        let NewList = arrayListVideos.filter((vdo) => vdo.id !== idVideoDelete);

        console.log(NewList);

        //Actualizar el array personajes en sessionStorage
        sessionStorage.setItem("listVideos", JSON.stringify(NewList));

        //Pintar nuevamente las card
        lookVideos(NewList, contenedorCards);

        console.log(listaVideos);
        console.log(arrayListVideos);

        document.addEventListener("DOMContentLoaded", () => {
          if (listaVideos.length === 0) {
            sessionStorage.setItem(
              "listVideos",
              JSON.stringify(arrayListVideos)
            );
            listaVideos = JSON.parse(sessionStorage.getItem("listVideos"));
            console.log(listaVideos);
          }
          lookVideos(listaVideos, contenedorCards);
        });
      }
    });
  }

  //El condicional para editar
  if (target.classList.contains("card__edit")) {
    console.log(target.name);
    sessionStorage.setItem("editVideo", JSON.stringify(target.name));
    window.location.href = "./FormCreate.html";
  }
});

// buscar en un array

let search = document.getElementById("inputSearch");

search.addEventListener("keydown", (e) => {
  const { target } = e;

  let valor=target.value
  console.log(target.value);
  const result2 = listaVideos.filter((p) => p.category == valor.toLowerCase());


  if(result2.length>=1){
    sessionStorage.setItem("listVideos", JSON.stringify(result2))
  }

  lookVideos(listaVideos, contenedorCards);

});
