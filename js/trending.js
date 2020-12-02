// -------------SECCIÓN 3 TRENDING GIFOS-----------------------

// variables
let contenedorCarrusel = document.getElementById('contenedor_carrusel');
let getApi = document.querySelector('.list_gifos');
let primerArrow = getApi.getElementsByTagName('div')[1];
let gifoUrl = "http://api.giphy.com/v1/gifs/trending?api_key=LcybAN2NSdMZKawiiuEU0m7lgBTrf52c&limit=12&offset=5&rating=g&random_id=e826c9fc5c929e0d6c6d423841a282aa";
var arrayDescarga = [];
// functions
function practicaApi(gifoUrl){
    fetch(gifoUrl)
        .then((Response) => Response.json())
        .then((data) => {
            arrayDescarga = data.data;
            // console.log(data);
            data.data.forEach((i) => {
                // console.log(i);
                let imagenes = document.createElement('img');
                imagenes.setAttribute('src', i.images.downsized.url);
                imagenes.setAttribute('id', 'gif');
                
                imagenes.setAttribute('data-title', i.title);
                imagenes.setAttribute('data-username', i.username);

                imagenes.classList.add('trending');
                // getApi.appendChild(imagenes);

                
                
                var contenedorGifosHover = document.createElement('div');
                contenedorGifosHover.setAttribute('class', 'contenedor_gifos_hover');

                contenedorGifosHover.appendChild(imagenes);
                
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


                

                
            })

            
        })
        .catch(err => {
            console.log(err);
        })
        
        
    }

    


practicaApi(gifoUrl);



//expandir escritorio

let test = document.querySelector('#contenedor_carrusel');

test.addEventListener('click', expandirEscritorio);

function expandirEscritorio (ya) {

    // console.log(e.target);
    if (ya.target.classList.contains('guardar_favorito_corazon')) {
        console.log("click corazon");
        verificar(ya)
        
    } 

     if (ya.target.classList.contains('expandir_gifo_desktop')) {
        console.log("se expande img");
        const gifModal = ya.target.parentElement.parentElement.parentElement.parentElement.children[0];
        // console.log(gifModal)
        modalEscritorio(gifModal);
    }


}

// me gusta escritorio

function verificar(e) {
    
    console.log(e.target);

    const llegarUrl = e.target.parentElement.parentElement.parentElement.parentElement.children[0];

    console.log(llegarUrl);

    let localStorageGifs = localStorage.getItem('favoritos');

    console.log(localStorageGifs);

    var localStorageGifsArray =  [];

    if (localStorageGifs != null) {
        localStorageGifsArray = JSON.parse(localStorageGifs);
    }

    localStorageGifsArray.push(llegarUrl.src)

    console.log(localStorageGifsArray)
    localStorage.setItem('favoritos', JSON.stringify(localStorageGifsArray));
    // console.log(localStorageGifsArray)
}




// se descarga el gif elegido

let descargarEscritorio = document.querySelector('#contenedor_carrusel');

descargarEscritorio.addEventListener('click',downloadGif );



function downloadGif(evento) {

    
    
    var btnDownload = evento.target.parentElement.parentElement.parentElement.parentElement.children[0].getAttribute('data-title');
    console.log(btnDownload);
    
    
    if (evento.target.classList.contains('descargar_gifo_escritorio')) {

        // console.log(arrayDescarga.data)

        arrayDescarga.map(async function (gif) {

            console.log(gif.title);

            if (gif.title == btnDownload ) {
    
                let blob = await fetch(gif.images.downsized.url).then((img) => {

                    console.log(img);

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









