const images = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];

//recupero tramite query selector i miei elementi
const boxImagesEl = document.querySelector(".carosel-box");
const btnUpEl = document.querySelector(".btn-up");
const btnDownEl = document.querySelector(".btn-down");
const anteprimaImg = document.querySelector(".anteprima-box");

//creo un indice per il carosello
let indice = 0;
//creo un array che conterra il riferimento agli elementi img da nascondere e mostrare al cambio indice
const carosuelItemList = [];

//creo un array che conterra il riferimento alle anteprime img
const anteprimeImgList = [];
//creo un array che conterra il riferimento alle anteprime div
const anteprimeDivList = []

// creo una variabile booleana per decidere lo scorrimento del thumbler
let scrollUp = false;



//Genero dinamicamente il contenuto del mio carosello
for (let i = 0; i < images.length; i++) {



    //creo un elemento div che conterra il boxTesto e l'elemento img
    const boxEl = document.createElement("div");

    //il mio elemetno lo salvo al interno dell'array dichiarato fuori dal for
    carosuelItemList.push(boxEl);


    //elemento coorispondente al mio indice ("sarà sempre 0")
    if (i !== indice) {
        boxEl.classList.add("d-none");
    }
    //utilizzo la variabile precedentemente creata per nascondere o mostrare il mio elemento genitore


    //creo gli elementi da appendere al genitore

    //creo un elemento img gli aggiungo classe e proprietà
    const imgEl = document.createElement("img");
    imgEl.classList.add("my-img");
    imgEl.src = images[i].image;
    imgEl.addEventListener("click", onImg)

    //creo un elemento div che conterra il mio titolo e sottotitolo
    const boxTxtEl = document.createElement("div");
    boxTxtEl.classList.add("txt-img");

    //creo elemento h1 e h5 come titolo e sottotitolo e gòi assegno il valore da array di oggetti
    const h1El = document.createElement("h1");
    const subtittle = document.createElement("h5");
    h1El.innerText = images[i].title;
    subtittle.innerText = images[i].text;

    //appendo gli elementi ai corrispettivi genitori
    boxTxtEl.append(h1El, subtittle);
    boxEl.append(boxTxtEl, imgEl);
    boxImagesEl.append(boxEl)


    //creo due elementi uno per l'effetto e l'altro contenitore delle immagini
    //e aggiungo rispettive classi
    const divEffect = document.createElement("div");
    const container = document.createElement("div");
    container.classList.add("relative");
    container.dataset.index=i;
    divEffect.classList.add("img-box");

    container.addEventListener("click",function(){
        oldAnteprima=document.querySelector(".anteprima-box .border-blue");
        oldDivEffect=document.querySelector(".anteprima-box .effetto-anteprima");
        carosuelItemList[((indice % carosuelItemList.length + carosuelItemList.length) % carosuelItemList.length)].classList.add("d-none");
        
        
        oldAnteprima.classList.remove("border-blue");
        oldDivEffect.classList.remove("effetto-anteprima");
        
        this.childNodes[0].classList.add("border-blue");
        this.childNodes[1].classList.add("effetto-anteprima");
        indice=parseInt(this.dataset.index);
        carosuelItemList[indice].classList.remove("d-none");
        
        


    })

    //creo un elemento img aggiunggo src e classe
    const anteprimaEl = document.createElement("img");
    anteprimaEl.src = images[i].image;
    anteprimaEl.classList.add("anteprima-img");
    anteprimaEl.alt = "";
    //attivo l'immagine con l'effetto corrispondente all'indice
    if (i === indice) {
        divEffect.classList.add("effetto-anteprima");
        anteprimaEl.classList.add("border-blue")
    }

    //calcolo l'altezza dinamicamente per le anteprime
    container.style.height = `calc( 100% / ${images.length} )`;

    //appendo i rispettivi elementi ai contenitori
    container.append(anteprimaEl);
    container.append(divEffect);
    anteprimaImg.append(container);

    //mi salvo il riferimetno al img nel array
    anteprimeImgList.push(anteprimaEl);

    //mi salvo il riferimetno al div nel array
    anteprimeDivList.push(divEffect);




}
let caroselAutoScroll = setInterval(function () {
    scrollUp ? pushUp() : pushDown();
}, 3000);

let imgIsClosed = true;
function onImg() {
    indice=((indice % carosuelItemList.length + carosuelItemList.length) % carosuelItemList.length);
    if (imgIsClosed) {
        clearInterval(caroselAutoScroll);
        anteprimaImg.classList.add("d-none");
        imgIsClosed = false;
        

        carosuelItemList[indice].childNodes[0].style.width = "100%";
        

    } else {
        caroselAutoScroll = setInterval(function () {
            scrollUp ? pushUp() : pushDown();
        }, 3000);
        anteprimaImg.classList.remove("d-none");
        imgIsClosed = true;
        carosuelItemList[indice].childNodes[0].style.width = null;

    }

}

// btnDownEl.addEventListener("click", function () {

//     //incremento l'indice
//     indice++;

//     //mi salvo in una const la qunatità di oggetti che ho
//     const n = carosuelItemList.length;
//     changeCarosuel(indice, n, false)

//     // //(indice-1) % n + n) % n utilizzo questa formula per creare un array circolare
//     // //cosi facendo l'indice sarà sempre in range
//     // //infine all'indice selezionato aggiungo o tolgo d-none
//     // carosuelItemList[((indice-1) % n + n) % n].classList.toggle("d-none");
//     // carosuelItemList[(indice % n + n) % n].classList.toggle("d-none");  

//     // //aggiungo e tolgo al thumbnail gli effetti
//     // anteprimeImgList[((indice-1) % n + n) % n].classList.toggle("border-blue");
//     // anteprimeImgList[((indice) % n + n) % n].classList.toggle("border-blue");
//     // anteprimeDivList[((indice-1) % n + n) % n].classList.toggle("effetto-anteprima");
//     // anteprimeDivList[((indice) % n + n) % n].classList.toggle("effetto-anteprima");



// });

btnDownEl.addEventListener("click", pushDown)
function pushDown() {
    //incremento l'indice
    indice++;

    //aggiorno la variabile scroll up 
    scrollUp = false;
    //mi salvo in una const la qunatità di oggetti che ho
    const n = carosuelItemList.length;
    changeCarosuel(indice, n, false);


}

btnUpEl.addEventListener("click", pushUp);
function pushUp() {

    //decremento l'indice
    indice--;

    //aggiorno la variabile scroll up 
    scrollUp = true;

    //mi salvo in una const la qunatità di oggetti che ho
    const n = carosuelItemList.length;

    changeCarosuel(indice, n, true)
    // //(indice-1) % n + n) % n utilizzo questa formula per creare un array circolare
    // //cosi facendo l'indice sarà sempre in range
    // //infine all'indice selezionato aggiungo o tolgo d-none
    // carosuelItemList[((indice+1) % n + n) % n].classList.toggle("d-none");
    // carosuelItemList[(indice % n + n) % n].classList.toggle("d-none");   

    // //aggiungo e tolgo al thumbnail gli effetti
    // anteprimeImgList[((indice+1) % n + n) % n].classList.toggle("border-blue");
    // anteprimeImgList[((indice) % n + n) % n].classList.toggle("border-blue");
    // anteprimeDivList[((indice+1) % n + n) % n].classList.toggle("effetto-anteprima");
    // anteprimeDivList[((indice) % n + n) % n].classList.toggle("effetto-anteprima");
}

/**
 * Questa funzione cambia le classi per generare l'effetto carosuel gli passo come valori 
 * indice del lettore la lnghezza degli elementi e un booleano per capire se il bottone 
 * premuto e up or down
 * 
 * @param {number} indice  
 * @param {number} lenght 
 * @param {boolean} isUp 
 */
function changeCarosuel(indice, lenght, isUp) {
    let k = -1;
    if (isUp) {
        k = 1;
    }

    carosuelItemList[((indice + k) % lenght + lenght) % lenght].classList.toggle("d-none");
    carosuelItemList[(indice % lenght + lenght) % lenght].classList.toggle("d-none");

    //aggiungo e tolgo al thumbnail gli effetti
    anteprimeImgList[((indice + k) % lenght + lenght) % lenght].classList.toggle("border-blue");
    anteprimeImgList[((indice) % lenght + lenght) % lenght].classList.toggle("border-blue");
    anteprimeDivList[((indice + k) % lenght + lenght) % lenght].classList.toggle("effetto-anteprima");
    anteprimeDivList[((indice) % lenght + lenght) % lenght].classList.toggle("effetto-anteprima");

}