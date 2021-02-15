// -------------SECCIÓN 3 TRENDING GIFOS-----------------------

// variables
let contenedorCarrusel = document.getElementById('contenedor_carrusel');
let getApi = document.querySelector('.list_gifos');
let primerArrow = getApi.getElementsByTagName('div')[1];
let gifoUrl = "https://api.giphy.com/v1/gifs/trending?api_key=LcybAN2NSdMZKawiiuEU0m7lgBTrf52c&limit=12&offset=5&rating=g&random_id=e826c9fc5c929e0d6c6d423841a282aa";
var arrayDescarga = [];
// functions
async function practicaApi(gifoUrl){
    const response = await fetch(gifoUrl);
    let data = await response.json();

    arrayDescarga = data.data;
    localStorage.setItem('trending', JSON.stringify(arrayDescarga));


    await data.data.forEach((i) => {
        // console.log(i);
        let imagenes = document.createElement('img');
        imagenes.setAttribute('src', i.images.downsized.url);
        imagenes.setAttribute('id', 'gif');
        
        imagenes.setAttribute('data-title', i.title);
        imagenes.setAttribute('data-username', i.username);
        imagenes.setAttribute('data-gifo', i.id);
        

        imagenes.classList.add('trending');     
        
        var contenedorGifosHover = document.createElement('div');
        contenedorGifosHover.setAttribute('class', 'contenedor_gifos_hover');

        contenedorGifosHover.appendChild(imagenes);
        // console.log(contenedorGifosHover);
        
        var mouseOverTarjeta = document.createElement('div');
        mouseOverTarjeta.setAttribute('class', 'mouse_over_tarjeta2');
        
        mouseOverTarjeta.innerHTML = `
        <div class="opciones_mouse_over">
        

                        <div class="borde_opciones_mause_over llegar_al_corazon">
                            <img class = guardar_favorito_corazon src="./assets/icon-fav-hover.svg" alt="">
                        </div>

                        <div class="borde_opciones_mause_over click_descarga_gifo">
                            <img class = "descargar_gifo_escritorio" id = "descargar_escritorio" src="./assets/icon-download.svg" alt="">
                        </div>

                        <div id="borde_opciones_mause_over_id" class="borde_opciones_mause_over">
                            <img src="./assets/icon-max-normal.svg"  class = "expandir_gifo_desktop" id ="expandir_gifo" alt="">
                        </div>
                        
                    </div>

                    <div class="usuario2_mouse_over">

                        <h3 class ="gifo_usuario_hover">${i.username}</h3>

                        <h2 class ="titulo_gifo_hover" class="titulo_gifo_hover">${i.title}</h2>

                    </div>`;

                    
        contenedorGifosHover.appendChild(mouseOverTarjeta);

        contenedorCarrusel.appendChild(contenedorGifosHover);

        getApi.insertBefore(contenedorCarrusel,primerArrow);

        
        // Evento click pop up modal
        imagenes.addEventListener("click", modal);
        console.log('Implementa trending');

        

        
    })
    leerLocalStorage();
}   


//Leer LS
function leerLocalStorage() {
    let localStorageGifs2 = JSON.parse( localStorage.getItem('favoritos'));
    localStorageGifs2.forEach(data => {    
        gifRepetido.forEach(element => {
            // console.log(element.id)    
            if (element.id === data.id) {
                let gifSeleccionado = document.querySelectorAll('.trending');
                // console.log(gifSeleccionado);
                
                gifSeleccionado.forEach(element => {
                    let DOMGifo = element.getAttribute('data-gifo');

                    if (DOMGifo === data.id) {
                        let logicaCorazon2 = element.parentElement.children[1];
                        logicaCorazon2.classList.add("mouse_over_tarjeta2_activo");
                        
                        let logicaCorazon = element.parentElement.children[1].children[0].children[0].children[0];
                        logicaCorazon.classList.add("logica_corazon");
                        logicaCorazon.setAttribute("src", "./assets/icon-fav-active.svg");
                    }
                })
            }    
        })
        
    });
}


practicaApi(gifoUrl);



//expandir escritorio

let test = document.querySelector('#contenedor_carrusel');
// click
test.addEventListener('click', expandirEscritorio); 

function expandirEscritorio (ya) {

    // console.log(ya.target);
    if (ya.target.classList.contains('guardar_favorito_corazon')) {
        console.log("click corazon");
        verificar(ya)
        
    } 

     if (ya.target.classList.contains('expandir_gifo_desktop')) {
        // console.log("se expande img");
        const gifModal = ya.target.parentElement.parentElement.parentElement.parentElement.children[0];
        // console.log(gifModal)
        modalEscritorio(gifModal);
    }


}


// me gusta escritorio

function verificar(e) {

    var logicaCorazon = e.target

    var logicaCorazon2 = e.target.parentElement.parentElement.parentElement;
    

    // console.log(logicaCorazon2);
    // console.log(logicaCorazon.classList.contains('logica_corazon'));

    if (logicaCorazon.classList.contains('logica_corazon')) {
        
        console.log("esta repetida");
        
        logicaCorazon2.classList.remove("mouse_over_tarjeta2_activo");
        
        var logicaCorazon3 = e.target.parentElement.parentElement.parentElement.parentElement.children[0];

        actualizarGifLocalStorage (logicaCorazon3.getAttribute('data-gifo'));
        
    } else {
        logicaCorazon2.classList.add("mouse_over_tarjeta2_activo");
        logicaCorazon.classList.add("logica_corazon");

        logicaCorazon.setAttribute("src", "./assets/icon-fav-active.svg");

    
        // console.log(logicaCorazon); 
        // console.log(logicaCorazon.classList.contains('logica_corazon')); 
        
        const llegarUrl = e.target.parentElement.parentElement.parentElement.parentElement.children[0];

        console.log(llegarUrl);

        let localStorageGifs = localStorage.getItem('favoritos');

        // console.log(localStorageGifs);

        // var localStorageGifsArray =  [];
        // var favoritosId = [];

        if (localStorageGifs != null) {
            localStorageGifsArray = JSON.parse(localStorageGifs);
        }

        const info = { 
            imagen: llegarUrl.src,
            id: llegarUrl.getAttribute("data-gifo")

        }

        // console.log(info)



        if ( localStorage.getItem('favoritos') === null ) {

        var favoritosLs = [];

        } else {
            
            favoritosLs = JSON.parse(localStorage.getItem('favoritos'))

        }
        
        favoritosLs.push(info);

        localStorage.setItem('favoritos', JSON.stringify(favoritosLs));
            
    
    }
     
}


function actualizarGifLocalStorage(e) {
    console.log(e);

    let favorites; 

    favorites = obtenerGifLocalStorage();
    
    console.log(favorites)
    
    for (let i = favorites.length; i--; ) {

        // console.log(favorites2[0].id)

        if (e === favorites[i].id) {


            // console.log(favorites.splice(i, 1))

            favorites.splice(i, 1)
            

        }

        localStorage.setItem('favoritos', JSON.stringify(favorites));

    }
}

function obtenerGifLocalStorage() {
    let favorites2 = JSON.parse(localStorage.getItem('favoritos'));
    return favorites2;
}



// se descarga el gif elegido escritorio

let descargarEscritorio = document.querySelector('#contenedor_carrusel');

descargarEscritorio.addEventListener('click',downloadGif );



function downloadGif(evento) {

    
    
    var btnDownload = evento.target.parentElement.parentElement.parentElement.parentElement.children[0].getAttribute('data-title');
    // console.log(btnDownload);
    
    
    if (evento.target.classList.contains('descargar_gifo_escritorio')) {

        // console.log(arrayDescarga.data)

        arrayDescarga.map(async function (gif) {

            // console.log(gif.title);

            if (gif.title == btnDownload ) {
    
                let blob = await fetch(gif.images.downsized.url).then((img) => {

                    // console.log(img);

                    img.blob().then((file) => {
                        
                        let a = document.createElement("a");
        
                        a.href = URL.createObjectURL(file);
        
                        a.download = gif.title;
        
                        a.click();
                    });
                });
            } 

        })
 
    } 
}

//------------------------- Get the modal
var contenedorModal = document.getElementById("myModal");

var modalImg = document.getElementById("img01");

var x = document.getElementsByClassName("close")[0];

var optionsText = document.getElementById("options");

function modalEscritorio (e){
    contenedorModal.style.display = "block";

    
    if (e.src) {
        var target = e.src;
        console.log(target);
    } else {
        var target = e.target.src;
        console.log(target);
    } 
    
    modalImg.setAttribute('src', target);

    optionsText.style.display = "none";
}

function modal(e){
    // console.log(e);
    contenedorModal.style.display = "block";

    if (e.src) {
        var target = e.src;
        console.log(target);
    } else {
        var target = e.target.src;
        console.log(target);
    } 
    
    modalImg.setAttribute('src', target);

    optionsText.style.display = "flex";

    // Title Gifo
    var tituloGifoH2 = document.getElementById('titulo_gifo');
    var tituloGifo = e.target.dataset.title;
    // console.log(e.target)
    tituloGifoH2.innerText = tituloGifo;

    // User Gifo
    var usuarioGifoH3 = document.getElementById('gifo_usuario');
    var userGifo = e.target.dataset.username;
    usuarioGifoH3.innerText = userGifo;

    //save gif into local storage
    var corazonLocalStorage = document.getElementById('corazon2');
    
    corazonLocalStorage.addEventListener('click', function() {
        console.log("hay click")
        let localStorageGifs = localStorage.getItem('favoritos');
        console.log(localStorageGifs);
        var localStorageGifsArray =  [];
        
        if (localStorageGifs != null) {
            localStorageGifsArray = JSON.parse(localStorageGifs);
        }

        localStorageGifsArray.push(target)
        localStorage.setItem('favoritos', JSON.stringify(localStorageGifsArray));
        // console.log(localStorageGifsArray)


    })
    // download gif mobile 
    

}

x.onclick = function() { 
    contenedorModal.style.display = "none";
}




// // -------------------CARRUSEL---------------------------------------
const arrowLeft = document.getElementById("left_arrow_id");
const arrowRigth = document.getElementById("rigth_arrow_id");
const slick = document.getElementsByClassName("contenedor_gifos_hover");
// console.log(slick)

var l = 0;

arrowRigth.onclick = () => {
    l++
    for(var i of slick){
        if(l==0){
            i.style.left = "0px";
        }
        if(l==1){
            i.style.left = "-640px";
        }
        if(l==2){
            i.style.left = "-1380px";
        }
        if(l==3){
            i.style.left = "-2120px";
        }
        if(l==4){
            i.style.left = "-2860px";
        }
        if(l>4){
            l=4
        }
    }
    
}

arrowLeft.onclick = () => {
    l--
    for(var i of slick){
        if(l==0){
            i.style.left = "0px";
        }
        if(l==1){
            i.style.left = "-740px";
        }
        if(l==2){
            i.style.left = "-1480px";
        }
        if(l==3){
            i.style.left = "-2220px";
        }
    
        if(l<0){
            l=4
        }
    }
    
}

console.log("se acaba trending")







