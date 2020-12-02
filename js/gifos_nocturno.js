const modo_nocturno = document.getElementById('dark_mode');
const cuerpo = document.getElementById('cuerpo')
// const linea = document.querySelector('li #linea');


modo_nocturno.addEventListener('click', () => {

    cuerpo.classList.toggle('mode_dark');

    
    if (cuerpo.classList.contains('mode_dark')) {
        
        localStorage.setItem('dark', 'true')

        modo_nocturno.innerText = 'Modo Diurno';


        let a = document.getElementById("a");
        a.style.color = "#FFFFFF";

        let a2 = document.getElementById("a_2");
        a2.style.color = "#FFFFFF";

        modo_nocturno.style.color = "#FFFFFF";

        let compartirEn = document.getElementById("compartir_enid");
        compartirEn.style.color ="#FFFFFF";

        let rights = document.getElementById("rightsid");
        rights.style.color ="#FFFFFF";

        let logoEscritorio = document.getElementById("logo_escritorio2");
        logoEscritorio.src = "./assets/Logo-modo-noc.svg";

        let tituloSeccion1 = document.getElementById("titulo_seccion_1");
        tituloSeccion1.style.color = "#FFFFFF";

        let trendinId = document.getElementById("trendin_id");
        trendinId.style.color = "#FFFFFF";

        let pId = document.getElementById("p_id");
        pId.style.color = "#FFFFFF";

        let buscadorNocturno = document.getElementById("buscador");
        buscadorNocturno.style.background = ("#37383C");

        let trendingNocturno = document.getElementById("seccion3_id");
        trendingNocturno.style.background = ("#222326");

        let searchForm = document.getElementById("search-form");
        searchForm.style.borderColor = "#FFFFFF";

        let iconoBuscador = document.getElementById("icon_buscador");
        iconoBuscador.src = "./assets/icon-search-modo-noct.svg";
    
        let h2Id = document.getElementById("h2_id");
        h2Id.style.color = "#FFFFFF";

        let ultimosTrandings = document.getElementById("ultimos_trandings");
        ultimosTrandings.style.color = "#FFFFFF";

        let flechaIzquierda = document.getElementById("left_arrow_id");
        flechaIzquierda.style.backgroundColor = "#222326";
        flechaIzquierda.style.borderColor = "#FFFFFF";
        let imgFlechaIzquierda = document.getElementById("flecha_isquierda");
        imgFlechaIzquierda.src ="./assets/button-slider-left-md-noct.svg";

        let flechaDerecha = document.getElementById("rigth_arrow_id");
        flechaDerecha.style.backgroundColor = "#FFFFFF";
        
        let imgFlechaDerecha = document.getElementById("flecha_derecha");
        imgFlechaDerecha.src ="./assets/Button-Slider-right-hover.svg";



        if (window.matchMedia("(max-width:768px)").matches) { // If media query matches

            let logoMobile = document.getElementById("logo_mobile1");
            logoMobile.src = "./assets/logo-mobile-modo-noct.svg";

            let a = document.getElementById("a");
            a.style.color = "#FFFFFF";

            let a2 = document.getElementById("a_2");
            a2.style.color = "#FFFFFF";

            modo_nocturno.style.color = "#FFFFFF";

            let compartirEn = document.getElementById("compartir_enid");
            compartirEn.style.color ="#FFFFFF";

            let rights = document.getElementById("rightsid");
            rights.style.color ="#FFFFFF";

        
        
        } 


    } else {

        localStorage.setItem('dark', 'false')
        
        modo_nocturno.innerText = 'Modo Nocturno';

        let logoEscritorio = document.getElementById("logo_escritorio2");
        logoEscritorio.src = "./assets/logo-desktop.svg";

        let tituloSeccion1 = document.getElementById("titulo_seccion_1");
        tituloSeccion1.style.color = "#572EE5";

        let trendinId = document.getElementById("trendin_id");
        trendinId.style.color = "#572EE5";

        let pId = document.getElementById("p_id");
        pId.style.color = "#572EE5";


        let a = document.getElementById("a");
        a.style.color = "#572EE5";

        let a2 = document.getElementById("a_2");
        a2.style.color = "#572EE5";

        modo_nocturno.style.color = "#572EE5";

        let rights = document.getElementById("rightsid");
        rights.style.color ="#000000";

        let buscadorNocturno = document.getElementById("buscador");
        buscadorNocturno.style.background = ("#FFFFFF");

        let trendingNocturno = document.getElementById("seccion3_id");
        trendingNocturno.style.background = ("white");

        let compartirEn = document.getElementById("compartir_enid");
        compartirEn.style.color ="#000000";

        let searchForm = document.getElementById("search-form");
        searchForm.style.borderColor = "#572EE5";

        let iconoBuscador = document.getElementById("icon_buscador");
        iconoBuscador.src = "./assets/icon-search.svg";

        let h2Id = document.getElementById("h2_id");
        h2Id.style.color = "#572EE5";

        let ultimosTrandings = document.getElementById("ultimos_trandings");
        ultimosTrandings.style.color = "#000000";

        
        let flechaIzquierda = document.getElementById("left_arrow_id");
        flechaIzquierda.style.backgroundColor = "#FFFFFF";
        flechaIzquierda.style.borderColor = "#572EE5";
        let imgFlechaIzquierda = document.getElementById("flecha_isquierda");
        imgFlechaIzquierda.src ="./assets/button-slider-left.svg";

        let flechaDerecha = document.getElementById("rigth_arrow_id");
        flechaDerecha.style.backgroundColor = "#572EE5";
        flechaDerecha.style.borderColor = "#572EE5";
        let imgFlechaDerecha = document.getElementById("flecha_derecha");
        imgFlechaDerecha.src ="./assets/Button-Slider-right-hover.svg";




        if (window.matchMedia("(max-width:768px)").matches) { // If media query matches
            
            let logoMobile = document.getElementById("logo_mobile1");
            logoMobile.src = "./assets/logo-mobile.svg";

            let a = document.getElementById("a");
            a.style.color = "#FFFFFF";

            let a2 = document.getElementById("a_2");
            a2.style.color = "#FFFFFF";

            modo_nocturno.style.color = "#FFFFFF";

           

            
        } 

    }

} )


if (localStorage.getItem('dark') === 'true') {
    cuerpo.classList.add('mode_dark');
    modo_nocturno.innerText = 'Modo Diurno'
    
} else {
    cuerpo.classList.remove('mode_dark');
    modo_nocturno.innerText = 'Modo Nocturno'
    
}