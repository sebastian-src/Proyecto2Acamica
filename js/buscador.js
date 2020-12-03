// ---------------------variables------------------------------------
const contenedorForm = document.getElementById('search-form')
const idBuscador = document.getElementById('buscador');
var resultadosBusqueda = document.getElementById('resultados_busqueda');
var resultadosBusqueda2 = document.getElementById('resultados_busqueda2');
const seccion2 = document.querySelector('.seccion2')




//evento---------------------------------------------------------------
contenedorForm.addEventListener('submit', function(e) { 
  // console.log('submit')
  e.preventDefault()
  var q = idBuscador.value
  search(q)
} )



//Function-------------------------------------------------------------
function search(q){
  
  const appikey = 'LcybAN2NSdMZKawiiuEU0m7lgBTrf52c'
  const urlAutocomplete = `https://api.giphy.com/v1/gifs/search?api_key=${appikey}&q=${q}&limit=12`
  fetch(urlAutocomplete).then(function(res){ //promise
    return res.json()
  }).then(function(json){ //json(data) es lo que recivo del fetch en Json
    // console.log(json.data[0].images.fixed_width.url); //asi es como se ve impreso en el DOM

    let resultsHTML = '';
    
    json.data.forEach(objetos =>{

      // console.log(objetos);
      const url = objetos.images.fixed_width.url;
      

      resultsHTML += `<img 
      id="item"
      src="${url}">`
    });

    resultadosBusqueda.innerHTML = resultsHTML; //reemplazar todo lo que este adentro de resultadosBusqueda en la seccion 2 del DOM
    resultadosBusqueda.classList.add('contenedor_imagenes_favoritos');



  
  
    
    
    // boton ver más
    const botonVerMas = document.getElementById('ver_mas');
    botonVerMas.style.display ='flex';
    // evento boton vér mas
    let mirarMas = document.getElementById('mirar_mas');
    mirarMas.addEventListener('click', function () {
      resultadosBusqueda2.innerHTML = resultsHTML; // otros 12 GIFS
      resultadosBusqueda2.classList.add('contenedor_imagenes_favoritos');
      botonVerMas.style.display ='none';
    })


    const tituloBusqueda = document.getElementById('titulo_busqueda');
    tituloBusqueda.innerText = q.toUpperCase(); //titulo de la busqueda en la seccion 2
    
    
  })
  .catch(function(err){
    console.log(err.message);
  })

  
  var searchIcon = document.getElementById('iconono_buscador');
  searchIcon.style.display = "none";
  const xbutton = document.getElementById('xbutton')
  xbutton.style.display = "block";
  xbutton.style.cursor = "pointer";

}


// Boton borrar la busqueda 
xbutton.addEventListener('click', function(){
  window.location.reload();
})


// Suggestion--------------------------------------------------------

// ---------------------variables------------------------------------
var buscadorSuggest = document.getElementById('buscador');
//----------------------evento
buscadorSuggest.addEventListener("keyup", () => {

    var qq = buscadorSuggest.value
    var urlSuggestions = `https://api.giphy.com/v1/gifs/search/tags?api_key=LcybAN2NSdMZKawiiuEU0m7lgBTrf52c&q=${qq}&limit=6`;
    
    fetch(urlSuggestions).then(function(res){

        return res.json()
        
    }).then(function(json){
        
        var match = document.getElementById('match_list');
        
        match.innerHTML = "" ;
        
        json.data.forEach(element => {
            
            var crearListas = document.createElement("li");
            
            crearListas.innerHTML = element.name;
            match.appendChild(crearListas);

            crearListas.style.cursor = "pointer";
            crearListas.addEventListener("click" , function() {
              search(crearListas.innerText);
            })

        });

    })

    
    if (qq != "") {

        var contenedorAmplioSuggestions = document.getElementById("search-form");
        
        contenedorAmplioSuggestions.style.height = "194px";

        var lineSuggestion = document.getElementById("line_suggestion");

        lineSuggestion.style.display = "block";


        
        
    } else {
        
        var contenedorAmplioSuggestions = document.getElementById("search-form");
        
        contenedorAmplioSuggestions.style.height = "50px";

        var lineSuggestion = document.getElementById("line_suggestion");

        lineSuggestion.style.display = "none";
  
    }
    

})



