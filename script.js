/*
    0 - verde
    1 - vermelho
    2 - amarelo
    3 - azul
*/


// Inicialização de variáveis
let order = [];
let clickedOrder = [];
let score = 0;

// Recebimento do texto que aprenseta o placar
const scoreText = document.querySelector('.score-text');

// Obtenção dos elementos cor pela classe
const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');

// Cria ordem aleatória de cores
const shuffleOrder = () =>{

    // Sorteia um número de 0 a 3
    let sortedNumber = Math.random()*4;

    // Retorna apenas a parte inteira do número sorteado anteriormente
    let colorOrder = Math.floor(sortedNumber);
    
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order){
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

// Acende a próxima cor
const lightColor = (element, number) =>{
    let interval = 500;
    number = number * interval;
    setTimeout(() => {
        element.classList.add('selected');
    }, number-(interval/2));
    setTimeout(() => {
        element.classList.remove('selected');
    }, number);
}

// Verifica se os botões clicados são os mesmos da ordem gerada no jogo
const checkOrder = () =>{
    for(let i in clickedOrder){
        if(clickedOrder[i] !== order[i]){
            gameOver();
            break
        }
    }
    if(clickedOrder.length == order.length){
        score++;
        nextLevel();
    }    
}

// Função para o clique do usuário
const click = color =>{
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() =>{
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250)
}

// Função que retorna a cor
const createColorElement = color =>{
    switch(color){
        case 0:
            return green;
        case 1:
            return red;
        case 2:
            return yellow;
        case 3:
            return blue;
    }
}

// Função para iniciar o jogo
const playGame = () =>{
    alert('Bem vindo ao Genius! Iniciando novo jogo!');
    nextLevel();
}

// Função para criar o próximo nível do jogo
const nextLevel = () =>{
    scoreText.innerHTML = `SCORE: ${score}`;
    shuffleOrder();
}

// Função para game over
const gameOver = () =>{
    alert(`Pontuação: ${score}\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];
    score = 0;
    scoreText.innerHTML = `SCORE: ${score}`;
    playGame();
}

// Acompanhamento dos clicks nos elementos de cor
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick= () => click(3);

// Inicializa placar de score
scoreText.innerHTML = `SCORE: ${score}`;

// Inicia o jogo quando o site carregar pela primeira vez
playGame();