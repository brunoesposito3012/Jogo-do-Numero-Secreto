let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML ='Escolha um número entre 1 e 10';
//utilizei função com parâmetro p diminuir o código
function exibirTextoNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
//colocar uma voz brasileira feminina nos textos das páginas
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo do número secreto');
    exibirTextoNaTela('p','Escolha um número entre 1 e 10');
}
    exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    
    if(chute == numeroSecreto){
        let palavraTentativa = tentativas > 1? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('h1', 'Parabéns!!');
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(chute > numeroSecreto){
            exibirTextoNaTela('p','O número secreto é menor');
        } else {
            exibirTextoNaTela('p','O número secreto é maior');
        }
        //tentativas = tentativas + 1;
        tentativas++;
        //ativei a função
        limparCampo();
    }
}

// nao é preciso passar alguma inf. pra gerarum numero aleatório
function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let qtdeElementosNaLista = listaNumerosSorteados.length;
//limpar a lista
    if(qtdeElementosNaLista == numeroLimite){
        listaNumerosSorteados = [];
    }
    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
} else{
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}