console.log("empieza gifos")

let contenedorImagenesFavoritos = document.getElementById('imagenes_favoritos');
let localStorageGifs2 = JSON.parse( localStorage.getItem('favoritos'));
// console.log(localStorageGifs2);
let conteFavoritos2 = document.getElementById('conte_favoritos2');

if (localStorageGifs2 != null ) {
    
    conteFavoritos2.style.display = "none";
    
    for (let index = 0; index < localStorageGifs2.length; index++) {
        const element = localStorageGifs2[index];
        let contenedorGifsFavoritos = document.createElement("img");
        // console.log(localStorageGifs2[index].imagen)
        contenedorGifsFavoritos.setAttribute('src', localStorageGifs2[index].imagen);
        // console.log(contenedorGifsFavoritos);
        contenedorImagenesFavoritos.appendChild(contenedorGifsFavoritos);
        contenedorGifsFavoritos.setAttribute("id","item2")
    }
    
    
}


else {
    
    conteFavoritos2.style.display = "block";
    contenedorImagenesFavoritos.style.display = "none"
    
}



// logica para no repetir el gifo

let gifRepetido = JSON.parse( localStorage.getItem('trending'));

// console.log(gifRepetido);





// localStorageGifs2.forEach(data => {
    
//     // console.log(data.id);

//     gifRepetido.forEach(element => {
//         // console.log(element.id)

//         if (element.id === data.id) {

//             console.log("si")
//             const gifSeleccionado = document.querySelectorAll('#seccion3');
//             console.log(gifSeleccionado);
//             //var gifSeleccionado = document.querySelectorAll(".trending")
            
//             // gifSeleccionado
            
//         } else {
            
//         }

//     })
    
// });









