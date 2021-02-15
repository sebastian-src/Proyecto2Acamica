const API_KEY = "LcybAN2NSdMZKawiiuEU0m7lgBTrf52c";
const URL_UPLOAD = 'https://upload.giphy.com/v1/gifs';
let modeCurrent = localStorage.getItem('modeCurrent');
let video = document.getElementById('recordingVideo');
let actionBtn = document.getElementById('actionBtn');
let instructionTitle = document.getElementById('instructionTitle');
let instructionDetail = document.getElementById('instructionDetail');
let stepOne = document.getElementById('one');
let steptwo = document.getElementById('two');
let stepthree = document.getElementById('three');
let counterRecording = document.getElementById('counter');
let repeatRecording = document.getElementById('repeatRecording');
let dateStart = new Date();
let counterStart;
let myGifs;
let recorder;
let blob;

// recupero el estado del modo de vista, si este ya ha sido definido 
modeCurrent = modeCurrent ? modeCurrent : "lightMode";
if (modeCurrent === "darkMode") {
    document.body.classList.add("darkMode");
    document.getElementById('modeView').textContent = "MODO DIURNO";
} else {
    document.body.classList.remove("darkMode");
}

actionBtn.addEventListener('click', startCreation);
repeatRecording.addEventListener('click', startCreation);

// se comienza el proceso de crear nuevo gif
function startCreation() {
    actionBtn.removeEventListener('click', startCreation);
    actionBtn.removeEventListener('click', saveGif);
    if (!repeatRecording.classList.contains('nonvisible')) {
        repeatRecording.classList.add('nonvisible');
    }
    actionBtn.classList.add('nonvisible');
    instructionTitle.textContent = '¿Nos das acceso a tu cámara?';
    instructionDetail.innerHTML = 'El acceso a tu camara será válido sólo <br> por el tiempo en el que estés creando el GIFO.'; /// ajustar este br con tamaño del parrafo, para quitar el innerHtml y dejar textContent
    stepOne.classList.add('current');
    getStreamAndRecord();
};

// funcion de uso de la libreria para acceso a la camara y obtencion de video
async function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                height: {
                    max: 480
                }
            }
        })
        .then(function (stream) {
            video.srcObject = stream;
            video.play();
            video.classList.remove('nonvisible');
            stepOne.classList.remove('current');
            steptwo.classList.add('current');
            actionBtn.textContent = 'GRABAR';
            actionBtn.classList.remove('nonvisible');
            actionBtn.addEventListener('click', recordVideo);
        });
}




// funcion para mostrar los elementos de ayuda en la grabacion del video
let recordVideo = function () {
    actionBtn.removeEventListener('click', recordVideo);
    actionBtn.textContent = 'FINALIZAR';
    recorder = RecordRTC(video.srcObject, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function () {
            console.log('started')
        },
    });
    dateStart = new Date();
    initCounter();
    keepCounter();
    recorder.startRecording();
    actionBtn.addEventListener('click', stopRecord);
}

// se obtiene e inicializa el contador de la grabacion
function initCounter() {
    let dateCurrent = new Date();
    let hours = dateCurrent.getHours() - dateStart.getHours();
    let minutes = dateCurrent.getMinutes() - dateStart.getMinutes();
    let seconds = dateCurrent.getSeconds() - dateStart.getSeconds();

    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    counterRecording.classList.remove('nonvisible');
    counterRecording.innerHTML = hours + ':' + minutes + ':' + seconds;
}

// funcion que mantiene el contador sumando hasta que se pida detener
function keepCounter() {
    counterStart = setInterval(initCounter, 1000);
}


// se detiene la grabacion y se obtiene el blob
let stopRecord = function () {
    clearInterval(counterStart);
    actionBtn.removeEventListener('click', stopRecord);
    actionBtn.textContent = 'SUBIR GIFO';
    counterRecording.textContent = '00:00:00';
    counterRecording.classList.add('nonvisible');
    recorder.stopRecording(function () {
        blob = recorder.getBlob();
        repeatRecording.classList.remove('nonvisible');
        actionBtn.addEventListener('click', saveGif);
    });

}


// -----------------------------------------------------------------

// se almacena la informacion del gif creado una vez ha sido subido a Giphy
let saveGif = function () {
    let overlayUploading = document.getElementById('uploadingGif');
    overlayUploading.classList.remove('nonvisible');
    repeatRecording.classList.add('nonvisible');
    steptwo.classList.remove('current');
    stepthree.classList.add('current');
    actionBtn.removeEventListener('click', saveGif);
    actionBtn.classList.add('nonvisible');
    
    uploadGif(blob).then(data => {
        let successfullCheck = document.getElementById('iconStateUpload');
        let successfullText = document.getElementById('textStateUpload');
        successfullCheck.setAttribute('src', './assets/ok.svg');
        successfullText.textContent = 'GIFO subido con éxito';
        // myGifs = localStorage.getItem("myGifs");
        console.log(myGifs)
        // myGifs = myGifs ? myGifs.split(',') : [];
        let urlid = `https://media.giphy.com/media/${data.id}/giphy.gif`

        let localStorageGifs = localStorage.getItem('myGifs');

        let localArray = [];

        if (localStorageGifs != null)  {

            localArray = JSON.parse(localStorageGifs);
            
        } 


        localArray.push(urlid)


        
        // localStorage.setItem("myGifs", myGifs.toString());
        localStorage.setItem('myGifs', JSON.stringify(localArray));

    });
}

// funcio de subida de gif a Giphy mediante la api
async function uploadGif(newGif) {
    let form = new FormData();
    form.append('file', newGif, 'sharaGif_' + Date.now() + '.gif');
    form.append('api_key', API_KEY);
    form.append('username', 'meneses-26');
    let resp = await fetch(URL_UPLOAD, {
        method: 'POST',
        body: form
    });
    let data = await resp.json();
    return data.data;
}





























// // se agrega a la lista el favorito elegido
// function addFavoriteGif(event) {
//     let idGifToAdd = (event.target.parentNode.parentNode.id).substring(7);
//     resultsList.map(function (newGif) {
//         if (newGif.id === idGifToAdd) {
//             favoriteGifs.push(newGif);
//         }
//     });
//     localStorage.setItem("favoriteGifs", JSON.stringify(favoriteGifs));
// }

// // llamado cuando se invoca el cambio de modo de vista
// function modeToggle() {
//     document.body.classList.toggle('darkMode');
//     if (modeCurrent === "lightMode") {
//         modeCurrent = "darkMode";
//         document.getElementById('modeView').textContent = "MODO DIURNO";
//     } else {
//         modeCurrent = "lightMode";
//         document.getElementById('modeView').textContent = "MODO NOCTURNO";
//     }
//     localStorage.setItem("modeCurrent", modeCurrent);
// }