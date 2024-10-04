const PLAYING = 'playing';
const PAUSED = 'paused';
const NOT_LOADED = 'not-loaded';
const LOADED  = 'loaded';
const PLAY = 'REPRODUCIR';
const PAUSE = 'PAUSAR';
const INFO = 'Status: ';
const RADIO_URL = 'http://radiouniversidad.unp.edu.ar:7130/;stream.mp3';
const STATUS = { PLAYING, PAUSED, LOADED, NOT_LOADED};
const LABELS = {PLAY, PAUSE, INFO}

function handlePlayEvent(evt)
{
    evt.target.classList.toggle('active');
    let player = document.getElementById('radioPlayer');
    let actualStatus = sessionStorage.getItem('status');
    let loadedStatus = sessionStorage.getItem('loaded');
    let btn = evt.target;
    
    if(loadedStatus === STATUS.NOT_LOADED) {
        sessionStorage.setItem('loaded', STATUS.LOADED);
        player.src = RADIO_URL;
    }
    if(actualStatus === STATUS.PAUSED) {
        player.play();
        actualStatus = STATUS.PLAYING;
    } else {
        player.pause();
        actualStatus = STATUS.PAUSED;
    }

    if(btn.innerText == LABELS.PLAY) {
        btn.innerText = LABELS.PAUSE;
    } else {
        btn.innerText = LABELS.PLAY;
    }

    sessionStorage.setItem('status', actualStatus);
}

function handleStalled(evt)
{
    let status = document.getElementById('audioStatus');
    status.innerHTML = ` ${LABELS.INFO} Ocurrio un error al obtener el stream`;
   
}

function handleSuspend(evt)
{
    let status = document.getElementById('audioStatus');
    status.innerHTML = `${LABELS.INFO} la trasmision se ha suspendido. Intente mas tarde`;
}

function handleWaiting(evt)
{
    let status = document.getElementById('audioStatus');
    status.innerHTML = `${LABELS.INFO} esperando data del stream`;
}

function handlePlaying(evt)
{
    let status = document.getElementById('audioStatus');
    status.innerHTML = `${LABELS.INFO} disfrutando la musica!`;
}

function handlePause(evt)
{
    let status = document.getElementById('audioStatus');
    status.innerHTML = `${LABELS.INFO} se ha pausado la reproducción!`;
}



function setListeningEvents(audio)
{
    audio.addEventListener('stalled', handleStalled);
    audio.addEventListener('suspend', handleSuspend);
    audio.addEventListener('waiting', handleWaiting)
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("pause", handlePause);
}

function init()
{
    sessionStorage.setItem('status', STATUS.PAUSED) ;
    sessionStorage.setItem('loaded', STATUS.NOT_LOADED);
    let radio = document.getElementById('radio');
    radio.addEventListener('click',  handlePlayEvent);
    let player = document.getElementById('radioPlayer');
    setListeningEvents(player);
}

window.onload = init;