const html = document.querySelector('html');
const displayTempo = document.querySelector('#timer');
const title = document.querySelector('.app__title');
const figure = document.querySelector('.app__image');
const start = document.querySelector('.app__card-primary-button'); // iniciar e pausar
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const focoTime = 1500;
const curtoTime = 300;
const longoTime = 900;
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarIcon = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const songPlay = new Audio('./sons/play.wav');
const songPause = new Audio('./sons/pause.mp3');
const songBeep = new Audio('./sons/beep.mp3');

let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () => musica.paused ? musica.play() : musica.pause())

let tempoDecorridoEmSegundos = 1500

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active');
});

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    figure.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            title.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `            
            break;
        case 'descanso-curto':
            title.innerHTML = `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
                `
            break;
        case 'descanso-longo':
            title.innerHTML = `
                Hora de voltar à superfície,<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}


const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        songBeep.play()
        zerar()
        alert('Tempo Finalizado!')
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        songPause.play()
        zerar()
        return
    }
    iniciarOuPausarBt.textContent = 'Pausar';
    iniciarOuPausarIcon.setAttribute('src', '/imagens/pause.png');
    songPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar() {
    iniciarOuPausarBt.textContent = 'Começar';
    iniciarOuPausarIcon.setAttribute('src', '/imagens/play_arrow.png');
    clearInterval(intervaloId)
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`;

}

mostrarTempo()