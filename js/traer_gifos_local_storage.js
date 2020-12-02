let contenedorImagenesFavoritos = document.getElementById('imagenes_favoritos');
let localStorageGifs2 = JSON.parse( localStorage.getItem('favoritos'));
console.log(localStorageGifs2);
let conteFavoritos2 = document.getElementById('conte_favoritos2');

if (localStorageGifs2 != null ) {
    
    conteFavoritos2.style.display = "none";
    
    for (let index = 0; index < localStorageGifs2.length; index++) {
        const element = localStorageGifs2[index];
        let contenedorGifsFavoritos = document.createElement("img");
        contenedorGifsFavoritos.setAttribute('src', localStorageGifs2[index]);
        console.log(contenedorGifsFavoritos);
        contenedorImagenesFavoritos.appendChild(contenedorGifsFavoritos);
        contenedorGifsFavoritos.setAttribute("id","item2")
    }
    
    
} else {
    
    conteFavoritos2.style.display = "block";
    contenedorImagenesFavoritos.style.display = "none"
    
}








