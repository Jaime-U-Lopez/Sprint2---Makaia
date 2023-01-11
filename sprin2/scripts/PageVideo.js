//array
import { arrayListVideosInicial } from "../data/data.js";


const arrayListVideos = arrayListVideosInicial.slice();


//llamamientos de nodos
const main = document.querySelector(".main");
const contenedorCards = document.getElementById("contenedorCards");

//funciones

const lookVideos = (listaVideos, contenedor) => {
  //para limpiar el contenedor de lo que tenga en html
  contenedor.innerHTML = "";

  const h2 = document.createElement("h2");

  h2.innerHTML = `  <h2>Videos sugeridos</h2> `;
  contenedor.appendChild(h2);

  listaVideos.forEach((videos) => {
    const article = document.createElement("articule");
    article.classList.add("CardVideosMini");
    article.innerHTML = `
 

    <figure class="CardVideosMini">
    <video  class="card__Vdo"  id="${videos.id}" width="100" height="150" controls>
  
      <source name="${videos.id}  " src="${videos.link}"    type="video/mp4">
      
      Your browser does not support the video tag.
    </video>

    <article class="ajustParrafo">
    <h4>  ${videos.title} </h4>

    <p> ${videos.adiciones} </p>
    </article>
  </figure>
  



        `;

    contenedor.appendChild(article);
  });
};

//Solicitud de LocaliStorage

let listaVideos = sessionStorage.getItem("listVideos")
  ? JSON.parse(sessionStorage.getItem("listVideos"))
  : [];

//regarga de la data de localStorage

document.addEventListener("DOMContentLoaded", () => {
  if (listaVideos.length === 0) {
    sessionStorage.setItem("listVideos", JSON.stringify(arrayListVideos));
    listaVideos = JSON.parse(sessionStorage.getItem("listVideos"));
    console.log(listaVideos);
  }

  lookVideos(listaVideos, contenedorCards);
});

//traer informacion con get item de localStorage

const idVideoStr = sessionStorage.getItem("seeVideo")
  ? JSON.parse(sessionStorage.getItem("seeVideo"))
  : null;

//array original

const ListaVideos = sessionStorage.getItem("listVideos")
  ? JSON.parse(sessionStorage.getItem("listVideos"))
  : [];

//condiciona para validar que el array no sea nulo
const idVideo = idVideoStr ? parseInt(idVideoStr) : null;

//se busca el id para del array original para pintarlo en la pagina
const video = idVideo
  ? ListaVideos.find((videoOne) => videoOne.id === idVideo)
  : {};

const container = document.querySelector(".VideoBig");

container.innerHTML = `

<article class="VideoBig">

<video width="680" height="450" controls    autoplay>
  <source
    src="${video.link}"
    type="video/mp4"

  />
  <source
    
  />
  Your browser does not support the video tag.
</video>

<h2>${video.title}</h2>
<h2>${video.name}</h2>
<p>${video.adiciones}</p>
</article>


`;

document.addEventListener("click", (event) => {
  const { target } = event;

  if (target.classList.contains("card__Vdo")) {
    console.log(target.id);
    sessionStorage.setItem("seeVideo", JSON.stringify(target.id));
    window.location.href = "./PageVideo.html";
  }
});
