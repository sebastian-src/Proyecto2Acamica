const API_KEY = "LcybAN2NSdMZKawiiuEU0m7lgBTrf52c";
const URL_GIPHY = "https://api.giphy.com";
let modeCurrent = localStorage.getItem('modeCurrent');
let searchDiv = document.getElementById('search');
let iconSearchActive = document.getElementById('iconSearch');
let iconClosedSearch = document.getElementById('closeSearch');
let suggestionDiv = document.getElementById('suggestions');
let suggestionList = document.getElementById('listSuggestions');
let searchInput = document.getElementById('inputSearch');
let textHomeSearch = document.getElementById('headerResultSearch');
let suggestionsText = document.querySelectorAll('#suggestions span');
let resultSearchSection = document.getElementById('resultsSearch');
let resultSearchDiv = document.createElement('div');
resultSearchDiv.setAttribute('id', 'gridResultsSearch');
let trendingGrid = document.getElementById('gridGifs');
let leftButton = document.getElementById('buttonLeft');
let rightButton = document.getElementById('buttonRight');
let modalGif = document.createElement("div");
modalGif.classList.add('modalGif', 'nonvisible');
let spanTextSuggestion;
let resultsListModal = [];
let term;
let totalResultsSearch = 0;
let resultsShown;
let resultsToLoad = 0;
let btnSeeMore;
let infoResultsShown;
let numberResultToShow = 0;
let favoriteGifs;
let offsetSelectorTrending = 0;

// recupero el estado del modo de vista, si este ya ha sido definido 
modeCurrent = modeCurrent ? modeCurrent : "lightMode";
if (modeCurrent === "darkMode") {
    document.body.classList.add("darkMode");
    document.getElementById('modeView').textContent = "MODO DIURNO";
} else {
    document.body.classList.remove("darkMode");
}

showTrending();

// preparo los eventos que estarán a la escucha de eventos en el buscador
searchInput.addEventListener('keyup', () => {
    searchTerm = searchInput.value;
    (searchTerm.length > 0) ? prepareSuggestions(searchTerm): clearSearch();
});

searchInput.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        term = searchInput.value;
        (term.length > 0) ? showSuggestions(): clearSearch();
    }
});

// metodos de consulta a la api de giphy

async function newSuggest(term) {
    let urlBase = `${URL_GIPHY}/v1/tags/related/${term}?api_key=${API_KEY}&limit=4`;
    let response = await fetch(urlBase);
    let suggestions = await response.json();
    return suggestions;
}

async function newSearch(term, offset) {
    let urlBase = `${URL_GIPHY}/v1/gifs/search?api_key=${API_KEY}&q=${term}&offset=${offset}&limit=12`;
    let response = await fetch(urlBase);
    let results = await response.json();
    return results;
}

async function trending(limit, offset) {
    let urlBase = `${URL_GIPHY}/v1/gifs/trending?api_key=${API_KEY}&limit=${limit}&offset=${offset}`;
    let response = await fetch(urlBase);
    let results = await response.json();
    return results;
}

// funcion que define las sugerencias a mostrarse en el buscador
function prepareSuggestions(searchTerm) {
    term = searchInput.value;
    searchDiv.classList.remove('inactive');
    iconSearchActive.classList.remove('nonvisible');
    iconClosedSearch.classList.add('active');
    iconClosedSearch.addEventListener('click', clearSearch);
    newSuggest(searchTerm).then((suggestedListApi) => {
        suggestionList.textContent = "";
        suggestedListApi.data.map(function (suggestedTerm) {
            let li = document.createElement("li");
            spanTextSuggestion = document.createElement("span");
            spanTextSuggestion.innerHTML = suggestedTerm.name;
            suggestionList.appendChild(li).appendChild(spanTextSuggestion);
            li.addEventListener('click', function () {
                term = suggestedTerm.name;
                showSuggestions()
            });
            iconSearchActive.removeEventListener('click', showSuggestions);
            iconSearchActive.addEventListener('click', showSuggestions);
        });
    })
    suggestionDiv.classList.remove('nonvisible');
}


// se muestran las sugerencias en el buscador
function showSuggestions() {
    clearSearch();
    textHomeSearch.classList.add('nonvisible');
    let searchTitle = document.createElement('h1');
    searchTitle.textContent = term;
    searchInput.value = term;
    resultSearchSection.appendChild(searchTitle);
    searchTitle.insertAdjacentHTML('beforebegin', '<hr>');
    resultSearchSection.appendChild(resultSearchDiv);
    searchTermsuggested(term);
}


function clearSearch() {
    searchDiv.classList.add('inactive');
    iconSearchActive.classList.add('nonvisible');
    iconClosedSearch.classList.remove('active');
    iconClosedSearch.removeEventListener('click', clearSearch);
    suggestionDiv.classList.add('nonvisible');
    resultSearchSection.textContent = "";
    resultSearchDiv.textContent = "";
    textHomeSearch.classList.remove('nonvisible');
    resultsToLoad = 0;
    searchInput.value = "";
}

// se prepara y muestra el resultado de la busqueda
function searchTermsuggested(termSuggested) {
    newSearch(termSuggested, resultsToLoad).then((resultListApi) => {
        if (resultListApi.data.length === 0) {
            resultSearchSection.innerHTML =
                `<div id="noResults">
                <img src="../images/icon-busqueda-sin-resultado.svg" alt="">
                <h3 class="textNoResult">Intenta con otra búsqueda.</h3>
            </div>`;
        }
        resultsToLoad += 12;
        if (!document.contains(btnSeeMore) && resultListApi.pagination.count >= 12) {
            btnSeeMore = document.createElement('button');
            btnSeeMore.setAttribute('class', 'btnLarge');
            btnSeeMore.textContent = "VER MÁS";
            btnSeeMore.addEventListener('click', () => {
                searchTermsuggested(termSuggested);
            });
            resultSearchSection.appendChild(btnSeeMore);
        } else if (document.contains(btnSeeMore) && resultListApi.pagination.count < 12) {
            btnSeeMore.remove();
        }

        resultListApi.data.map(function (resultGif) {
            resultsListModal.push(resultGif);
            let gif = document.createElement('div');
            let id = resultGif.id;
            let selectorFavorite = ".iconFavorite[name='" + id + "']";
            let selectorDownload = ".iconDownload[name='" + id + "']";
            let selectorMaximize = ".iconMaximize[name='" + id + "']";
            gif.innerHTML = `<img name="${id}" class="gifPreview" src="${resultGif.images.fixed_height.url}">
                            <div id="infoGif${id}" class="gifContent">
                                <div class="icons">
                                    <img name="${id}" class="iconGifs iconFavorite" alt="">
                                    <img name="${id}" class="iconGifs iconDownload" alt="">
                                    <img name="${id}" class="iconGifs iconMaximize" alt="">
                                </div>
                                <div class="info" style="position-: right;position: absolute;bottom: 30px;left: 20px;">
                                    <span id="nameUserGif">${resultGif.username}</span>
                                    <span id="titleGif">${resultGif.title}</span>
                                </div>
                            </div>`;
            resultSearchDiv.appendChild(gif);
            document.querySelector(selectorFavorite).addEventListener('click', addFavoriteGif);
            document.querySelector(selectorDownload).addEventListener('click', downloadGif);
            document.querySelector(selectorMaximize).addEventListener('click', maximizeGif);
            favoritesMark(id);
            mobileMaximize();
        })
    }).catch((err) => {
        console.log(err);
    });
}

// se aplica el maximizar gif al dar click en la imagen solo para vista movil
function mobileMaximize() {
    if (window.matchMedia("(max-width: 1023px)").matches) {
        let gifsPreview = document.querySelectorAll(".gifPreview");
        gifsPreview.forEach(gifPreview => {
            gifPreview.removeEventListener('click', maximizeGif);
            gifPreview.addEventListener('click', maximizeGif);
        });
    }
}

// se marcan ctivos los favoritos que esten almacenados en el localstorage
function favoritesMark(idGif) {
    favoriteGifs = localStorage.getItem("favoriteGifs");
    favoriteGifs = favoriteGifs ? JSON.parse(favoriteGifs) : [];
    favoriteGifs.map(function (gif) {
        if (gif.id === idGif) {
            let favorite = document.querySelectorAll(".iconFavorite[name='" + idGif + "']");
            favorite.forEach(fav => {
                fav.classList.add('active');
                fav.removeEventListener('click', addFavoriteGif);
            });
        }
    });
}

// se agrega a la lista el favorito elegido
function addFavoriteGif(event) {
    let idGifToAdd = event.target.name;
    resultsListModal.map(function (newGif) {
        if (newGif.id === idGifToAdd) {
            favoriteGifs.push(newGif);
        }
    });
    localStorage.setItem("favoriteGifs", JSON.stringify(favoriteGifs));
    favoritesMark(idGifToAdd);
}

// se descarga el gif elegido
function downloadGif(event) {
    let firstMatch = false;
    let idGifToDownload = event.target.name;
    resultsListModal.map(async function (gif) {
        if (gif.id === idGifToDownload && !firstMatch) {
            firstMatch = true;
            let blob = await fetch(gif.images.downsized.url).then((img) => {
                img.blob().then((file) => {
                    let a = document.createElement("a");
                    a.href = URL.createObjectURL(file);
                    a.download = gif.title;
                    a.click();
                });
            });
        }
    });
}

// se visualiza el gif elegido en un modal
function maximizeGif(event) {
    let idGifToDownload = event.target.name;
    resultsListModal.map(async function (gif) {
        if (gif.id === idGifToDownload) {
            let selectorFavorite = ".iconFavModal[name='" + gif.id + "']";
            let selectorDownload = ".iconDownModal[name='" + gif.id + "']";
            modalGif.innerHTML = `
                    <img id="btnClose" src="./images/button-close.svg" onclick="closeModal()" alt="">   
                    <img id="imgGifDesktop" src="${gif.images.downsized_large.url}" alt="" >
                    <div id="modalGifInfo">
                        <div id="modalText">
                            <span id="infoUsername" class="infoUser">${gif.username}</span>
                            <span id="infoTitle" class="infoTitle">${gif.title}</span>
                        </div>
                        <div class="icons">
                            <img name="${gif.id}" class="iconGifs iconFavModal iconFavorite" alt="">
                            <img name="${gif.id}" class="iconGifs iconDownModal iconDownload" alt="">
                        </div>
                    </div>`;
            modalGif.classList.add("modalGif");
            document.body.appendChild(modalGif);
            document.querySelector(selectorFavorite).addEventListener('click', addFavoriteGif);
            document.querySelector(selectorDownload).addEventListener('click', downloadGif);
            modalGif.classList.remove('nonvisible');
            favoritesMark(gif.id);
        }
    });
}

function closeModal() {
    modalGif.classList.replace('modalGif', 'nonvisible')
}

// se cargan los gifs de tendencia por tandas de 3 en un carrusel
function showTrending() {
    trending(3, offsetSelectorTrending).then((resultListApi) => {
        resultsList = resultListApi.data;
        resultsList.forEach(gif => {
            resultsListModal.push(gif);
        })
        trendingGrid.textContent = "";
        resultListApi.data.map(function (resultGif) {
            let gif = document.createElement('div');
            let id = resultGif.id;
            let selectorFavorite = ".iconFavorite[name='" + id + "']";
            let selectorDownload = ".iconDownload[name='" + id + "']";
            let selectorMaximize = ".iconMaximize[name='" + id + "']";
            gif.innerHTML = `<img name="${id}" class="gifPreview" src="${resultGif.images.fixed_height.url}">
                            <div id="infoGif${id}" class="gifContent">
                                <div class="icons">
                                    <img name="${id}" class="iconGifs iconFavorite" alt="">
                                    <img name="${id}" class="iconGifs iconDownload" alt="">
                                    <img name="${id}" class="iconGifs iconMaximize" alt="">
                                </div>
                            </div>`;
            trendingGrid.appendChild(gif);
            document.querySelector(selectorFavorite).addEventListener('click', addFavoriteGif);
            document.querySelector(selectorDownload).addEventListener('click', downloadGif);
            document.querySelector(selectorMaximize).addEventListener('click', maximizeGif);
            favoritesMark(id);
            mobileMaximize();
        });
    });
    if (offsetSelectorTrending === 3) {
        leftButton.classList.add('active');
        leftButton.addEventListener('click', slideToLeft);
    } else if (offsetSelectorTrending === 0) {
        leftButton.removeEventListener('click', slideToLeft);
        leftButton.classList.remove('active');
        rightButton.removeEventListener('click', slideToRight);
        rightButton.addEventListener('click', slideToRight);
    };
}

function slideToLeft() {
    offsetSelectorTrending -= 3;
    showTrending();
}

function slideToRight() {
    offsetSelectorTrending += 3;
    showTrending();
}

// llamado cuando se invoca el cambio de modo de vista
function modeToggle() {
    document.body.classList.toggle('darkMode');
    if (modeCurrent === "lightMode") {
        modeCurrent = "darkMode";
        document.getElementById('modeView').textContent = "MODO DIURNO";
    } else {
        modeCurrent = "lightMode";
        document.getElementById('modeView').textContent = "MODO NOCTURNO";
    }
    localStorage.setItem("modeCurrent", modeCurrent);
}

// desplegar menu hamburguesa cuando aplica vista movil
function hamburgerMenu() {
    let nav = document.getElementById('ppalNav');
    nav.classList.toggle('active');
}