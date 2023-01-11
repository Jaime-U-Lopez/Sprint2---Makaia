const form = document.querySelector(".form");

// Arrays

import { arrayListVideosInicial } from "../data/data.js";

const arrayListVideos = arrayListVideosInicial.slice();

const arrayProductos = [];

//traer informacion con get item de localStorage

const idVideoStr = sessionStorage.getItem("editVideo")
  ? JSON.parse(sessionStorage.getItem("editVideo"))
  : null;

//array original

const ListaVideos = sessionStorage.getItem("listVideos")
  ? JSON.parse(sessionStorage.getItem("listVideos"))
  : [];


//Funciones

document.addEventListener("DOMContentLoaded", () => {
  if (arrayListVideos.length === 0) {
    sessionStorage.setItem("listVideos", JSON.stringify(arrayListVideos));
    listProduct = JSON.parse(sessionStorage.getItem("listVideos"));
  }
});

form.addEventListener("submit", (event) => {
  //con esto evitamos que la pagina se recargue
  event.preventDefault();
  const valueForm = Object.values(form);

  const newVideo = {};

  valueForm.forEach((valueInput) => {
    let id = "id";

    if (valueInput.id) {
      let idNumero = arrayListVideos.length + 1;
      newVideo[valueInput.id] = valueInput.value;
      newVideo[id] = idNumero;
    }
  });

  arrayListVideos.push(newVideo);

  let listProduct;

  //ingresar la informacion a sessionStorage
  if(arrayListVideos.length<ListaVideos.length ){

    const arrayLocalStorage = sessionStorage.setItem(
      "listVideos",
      JSON.stringify(arrayListVideos)
    );

  }else{


    const arrayLocalStorage = sessionStorage.setItem(
      "listVideos",
      JSON.stringify(ListaVideos)
    );

  }


  

  //Limpiar cada campo del formulaio
  valueForm.forEach((data) => {
    if (data.id) {
      data.value = "";
    }
  });
});

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


//condiciona para validar que el array no sea nulo
const idVideo = idVideoStr ? parseInt(idVideoStr) : null;

//se busca el id para del array original para pintarlo en la pagina
const video = idVideo
  ? ListaVideos.find((videoOne) => videoOne.id === idVideo)
  : {};

let array = [video];

if (video) {
  console.log("hola");
} else {
  console.log("vacio");

  let array = [
    {
      title: null,
      name: null,
      path: null,
      category: null,
    },
  ];
}

console.log(video);

const updateProduct = (array) => {
  let inputTitle = document.getElementById("title");
  let inputName = document.getElementById("name");
  let inputPath = document.getElementById("link");
  let inputAdicion = document.getElementById("adiciones");
  let inputCategory = document.getElementById("category");


  let title= document.querySelector(".titleForm")
 
  title.innerHTML=""
  title.innerHTML=` <h1 class="titleForm">Form Update   </h1> `



  if (array) {
    array.map((element) => {
      let newTitle = (inputTitle.value = element.title);
      let newName = (inputName.value = element.name);
      let newLink = (inputPath.value = element.link);
      let newAdiciones = (inputAdicion.value = element.adiciones);
      let newCategory = (inputCategory.value = element.category);
    });
  } else {
   console.log(vacio)
  
  }
};


let habilityForUpdate = sessionStorage.getItem("editVideo")

if(habilityForUpdate!=="null"){
  updateProduct(array)
}

document.addEventListener("submit", (event) => {
  //Elimina el personaje
  // arrayListVideos.splice(idVideo, 1);

  let valor = arrayListVideos[idVideo];
  console.log(valor);

  const positionVideo = ListaVideos.findIndex((video) => video.id === idVideo);

  console.log(positionVideo);

  //Elimina el personaje

  console.log(ListaVideos);

  let NewList = arrayListVideos.filter((vdo) => vdo.id !== positionVideo + 1);

  console.log(NewList);
  let vaciar=null
  //Actualizar el array personajes en sessionStorage
  sessionStorage.setItem("listVideos", JSON.stringify(NewList));
  sessionStorage.setItem("editVideo", JSON.stringify(vaciar));


})


console.log(arrayListVideos);

document.addEventListener("click", (event) => {

  const {target}=event

  console.log(target.classList.button)
  let limpiar=null;
  let LimpiarForm= sessionStorage.setItem("editVideo", JSON.stringify(limpiar))
} )
