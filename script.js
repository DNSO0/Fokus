const html = document.querySelector('html')
const botonEnfoque = document.querySelector('.app__card-button--enfoque')
const botonCorto = document.querySelector('.app__card-button--corto')
const botonLargo = document.querySelector('.app__card-button--largo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botones =document.querySelectorAll('.app__card-button')
const inputEnfoqueMusica = document.querySelector('#alternar-musica')
const botonIniciarPausar = document.querySelector('#start-pause')
const textoIniciarPausar = document.querySelector('#start-pause ')

const musica = new Audio('./sonidos/luna-rise-part-one.mp3')
const sonidoPlay = new Audio('./sonidos/play.wav')
const sonidoPause = new Audio('./sonidos/pause.mp3')
const audioTiempoFinalizado = new Audio('./sonidos/beep.mp3')

let tiempoTranscurridoEnSegndos = 5
let idIntervalo = null

musica.loop = true;

//elemento.addEventListener(evento, callback);

inputEnfoqueMusica.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

botonEnfoque.addEventListener('click', () =>{
    cambiarContexto('enfoque')
    botonEnfoque.classList.add('active')
})

botonCorto.addEventListener('click', () =>{
    cambiarContexto('descanso-corto')
    botonCorto.classList.add('active')
})

botonLargo.addEventListener('click', () =>{
    cambiarContexto('descanso-largo')
    botonLargo.classList.add('active')
})

function cambiarContexto(contexto){

    botones.forEach(function(contexto){
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagenes/${contexto}.png`)

    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = `
            Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>
            `
            break;
        case "descanso-corto":
            titulo.innerHTML =`
            ¿Qué tal tomar un respiro?<br>
                <strong class="app__title-strong">¡Haz una pausa corta!</strong>
            `
            break;
        case "descanso-largo":
            titulo.innerHTML =`
            Hora de volver a la suerficie<br>
                <strong class="app__title-strong">Haz una oausa larga.</strong>
            `
            break;
        default:
            break;
    }
}

const cuentaRegresiva = () => {
    if(tiempoTranscurridoEnSegndos <= 0){
        audioTiempoFinalizado .play()
        alert('Tiempo final')
        reiniciar()
        return
    }
    textoIniciarPausar.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagenes/pause.png" alt="">
                        <span>Pausar</span>`
    tiempoTranscurridoEnSegndos -= 1
    console.log("Temporizador:" + tiempoTranscurridoEnSegndos)
}

botonIniciarPausar.addEventListener('click', iniciarPausar)

function iniciarPausar(){
    if(idIntervalo){
        sonidoPause.play();
        reiniciar()
        return
    }
    sonidoPlay.play();
    idIntervalo = setInterval(cuentaRegresiva, 1000)
}

function reiniciar() {
    clearInterval(idIntervalo)
    idIntervalo = null
    textoIniciarPausar.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagenes/play_arrow.png" alt="">
                        <span>Comenzar</span>`
}