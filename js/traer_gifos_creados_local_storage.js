// llevar gifos al documento crear gifo
let contenedorCrearGifo = document.getElementById('gifsCreados');
let localStorageCrearGif = JSON.parse( localStorage.getItem('myGifs'));

console.log(localStorageCrearGif);
let conteCrearGifo2 = document.getElementById('conte_crear_gifo2');

if (localStorageCrearGif != null) {

    conteCrearGifo2.style.display = "none";
    
    for (let index = 0; index < localStorageCrearGif.length; index++) {
        const element =  localStorageCrearGif[index];
        let imgGifosCreados = document.createElement("img");
        imgGifosCreados.setAttribute('src', localStorageCrearGif[index]);
        console.log(imgGifosCreados);
        contenedorCrearGifo.appendChild(imgGifosCreados);
        imgGifosCreados.setAttribute("id","item2")
    
    }

} else {

    conteCrearGifo2.style.display = "block";
    contenedorCrearGifo.style.display = "none"
    
}



