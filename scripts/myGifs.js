const API_KEY = "LcybAN2NSdMZKawiiuEU0m7lgBTrf52c";
const URL_GIPHY = "https://api.giphy.com";
let myGifs = localStorage.getItem("myGifs");
let modeCurrent = localStorage.getItem('modeCurrent');
let myGifsSection = document.getElementById("myGifs");
let gifsGrid = document.createElement('div');
gifsGrid.setAttribute('id', 'gifsGrid');
myGifsSection.appendChild(gifsGrid);
let trendingGrid = document.getElementById('gridGifs');
let leftButton = document.getElementById('buttonLeft');
let rightButton = document.getElementById('buttonRight');
let modalGif = document.createElement("div");
modalGif.classList.add('modalGif', 'nonvisible');
let resultsToLoad = 0;
let resultListApi;
let btnSeeMore;
let offsetSelectorTrending = 0;
let resultsListModal = [];

// recupero el estado del modo de vista, si este ya ha sido definido 
modeCurrent = modeCurrent ? modeCurrent : "lightMode";
if (modeCurrent === "darkMode") {
    document.body.classList.add("darkMode");
    document.getElementById('modeView').textContent = "MODO DIURNO";
} else {
    document.body.classList.remove("darkMode");
}
showTrending();

//validar si no exsten gifos propios guardados para mostrar mensaje correspondiente
if (myGifs === null) {
    myGifsSection.innerHTML =
        `<section id="id="noResults" style="display: block;">
            <img src="./images/icon-mis-gifos-sin-contenido.svg" alt="mis gifos sin contenido">
            <h3 class="textNoResult">¡Animate a crear tu primer GIFO!</h3>
        </section>`;
} else {
    searchById(myGifs).then((response) => {
        resultListApi = response.data;
        showMyGifs();
    }).catch((err) => {
        console.log(err);
    });
}

// funciones de consulta a la api de Giphy
async function trending(limit, offset) {
    let urlBase = `${URL_GIPHY}/v1/gifs/trending?api_key=${API_KEY}&limit=${limit}&offset=${offset}`;
    let response = await fetch(urlBase);
    let results = await response.json();
    return results;
}

async function searchById(ids) {
    let urlBase = `${URL_GIPHY}/v1/gifs?api_key=${API_KEY}&ids=${ids}`;
    let response = await fetch(urlBase);
    let results = await response.json();
    return results;
}

// se prepara y muestra la lista de gifs creados por el usuario
function showMyGifs() {
    resultsToLoad += 12;
    let myGifsShown = resultListApi.slice(resultsToLoad - 12, resultsToLoad);
    if (!document.contains(btnSeeMore) && myGifs.length >= 12) {
        btnSeeMore = document.createElement('button');
        btnSeeMore.setAttribute('class', 'btnLarge');
        btnSeeMore.textContent = "VER MÁS";
        btnSeeMore.addEventListener('click', () => {
            showMyGifs();
        });
        myGifsSection.appendChild(btnSeeMore);
    } else if (document.contains(btnSeeMore) && myGifsShown.length < 12) {
        btnSeeMore.remove();
    }

    myGifsShown.map(function (resultGif) {
        resultsListModal.push(resultGif);
        idGif = resultGif.id;
        let gif = document.createElement('div');
        let selectorFavorite = ".iconTrash[name='" + idGif + "']";
        let selectorDownload = ".iconDownload[name='" + idGif + "']";
        let selectorMaximize = ".iconMaximize[name='" + idGif + "']";
        gif.innerHTML = `<img name="${idGif}" class="gifPreview" src="${resultGif.images.fixed_height.url}">
                        <div id="infoGif${idGif}" class="gifContent">
                            <div class="icons">
                                <img name="${idGif}" class="iconGifs iconTrash active" alt="">
                                <img name="${idGif}" class="iconGifs iconDownload" alt="">
                                <img name="${idGif}" class="iconGifs iconMaximize" alt="">
                            </div>
                            <div class="info" style="position-: right;position: absolute;bottom: 30px;left: 20px;">
                                <span id="nameUserGif">${resultGif.username}</span>
                                <span id="titleGif">${resultGif.title}</span>
                            </div>
                        </div>`;
        gifsGrid.appendChild(gif);
        document.querySelector(selectorDownload).addEventListener('click', downloadGif);
        document.querySelector(selectorMaximize).addEventListener('click', maximizeGif);
        mobileMaximize();
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
    let idGifToDownload = event.target.name;
    let firstMatch = false;
    resultsListModal.map(async function (gif) {
        if ((gif.id === idGifToDownload) && !firstMatch) {
            firstMatch = true;
            let blob = await fetch(gif.images.downsized.url).then((img) => {
                img.blob().then((file) => {
                    let a = document.createElement("a");
                    a.href = URL.createObjectURL(file);
                    a.download = gif.title;
                    a.click();
                });
            });
        };
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
        });
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
                                <div class="info" style="position-: right;position: absolute;bottom: 30px;left: 20px;">
                                    <span id="nameUserGif">${resultGif.username}</span>
                                    <span id="titleGif">${resultGif.title}</span>
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