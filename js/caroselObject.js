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
//creo un array che conterra il riferimento agli elementi da nascondere e mostrare al cambio indice
const carosuelItemList=[];

//Genero dinamicamente il contenuto del mio carosello
for(let i =0;i<images.length;i++){
    
   
    
    //creo un elemento div che conterra il boxTesto e l'elemento img
    const boxEl=document.createElement("div");

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
    imgEl.src=images[i].image;

    //creo un elemento div che conterra il mio titolo e sottotitolo
    const boxTxtEl=document.createElement("div");
    boxTxtEl.classList.add("txt-img");

    //creo elemento h1 e h5 come titolo e sottotitolo e gòi assegno il valore da array di oggetti
    const h1El=document.createElement("h1");
    const subtittle=document.createElement("h5");
    h1El.innerText=images[i].title;
    subtittle.innerText=images[i].text;

    //appendo gli elementi ai corrispettivi genitori
    boxTxtEl.append(h1El,subtittle);
    boxEl.append(boxTxtEl,imgEl);
    boxImagesEl.append(boxEl)


}

btnUpEl.addEventListener("click",function(){

    //incremento l'indice
    indice++;

    //mi salvo in una const la qunatità di oggetti che ho
    const n=carosuelItemList.length;

    //(indice-1) % n + n) % n utilizzo questa formula per creare un array circolare
    //cosi facendo l'indice sarà sempre in range
    //infine all'indice selezionato aggiungo o tolgo d-none
    carosuelItemList[((indice-1) % n + n) % n].classList.toggle("d-none");
    carosuelItemList[(indice % n + n) % n].classList.toggle("d-none");   
});

btnDownEl.addEventListener("click",function(){

    //decremento l'indice
    indice--;

    //mi salvo in una const la qunatità di oggetti che ho
    const n=carosuelItemList.length;

    //(indice-1) % n + n) % n utilizzo questa formula per creare un array circolare
    //cosi facendo l'indice sarà sempre in range
    //infine all'indice selezionato aggiungo o tolgo d-none
    carosuelItemList[((indice+1) % n + n) % n].classList.toggle("d-none");
    carosuelItemList[(indice % n + n) % n].classList.toggle("d-none");   
});


