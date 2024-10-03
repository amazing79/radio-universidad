const PLAYING = 'playing';
const PAUSED = 'paused';
const NOT_LOADED = 'not-loaded';
const LOADED  = 'loaded';
const PLAY = 'REPRODUCIR';
const PAUSE = 'PAUSAR';
const RADIO_URL = 'http://radiouniversidad.unp.edu.ar:7130/;stream.mp3';
const STATUS = { PLAYING, PAUSED, LOADED, NOT_LOADED};
const LABELS = {PLAY, PAUSE}

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

function init()
{
    sessionStorage.setItem('status', STATUS.PAUSED) ;
    sessionStorage.setItem('loaded', STATUS.NOT_LOADED);
    let radio = document.getElementById('radio');
    radio.addEventListener('click',  handlePlayEvent);
}

window.onload = init;