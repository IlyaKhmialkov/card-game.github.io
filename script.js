
const startButton = document.querySelector('.game-start');
const restartButton = document.querySelector('.game-restart');
const attempts = document.querySelector('.attempts');
const games = document.querySelector('.games')
let clickedButtonClass = 0;
let timer;

startButton.onclick = function() {
    GameSetup();
    GameStart();
};
restartButton.onclick = function() {
    const select = document.getElementById('game-size');
    const label = document.querySelector('label');

    clickedButtonClass = 0;
    attempts.textContent = 0;
    select.disabled = false;
    startButton.disabled = false;
    restartButton.disabled = true;
    label.style.color = 'white';


    const template = document.querySelector('template');
    const templateChilds = template.querySelectorAll('*');

    templateChilds.forEach(function(element){
        element.remove();
    });
}
function showNumberOfCard (div) {
    if (div.className[16] == undefined){
        div.textContent = div.className[15];
    }
    else{
    div.textContent = div.className[15] + div.className[16];
    }
}
function GameStart () {
    const template = document.querySelector('template');
    const select = document.getElementById('game-size');
    const sizeOfGame = select.value;

    switch(sizeOfGame){
        case '2x3':{
            
            template.style.gridTemplate = "1fr 1fr / 1fr 1fr 1fr";
            let countOfSameCards = [0, 0, 0];

            for (let i = 0; i < 6; i++){
                AddCardToGame(template, countOfSameCards);
            }
            break;
        }
        case '3x4':{
            
            template.style.gridTemplate = "1fr 1fr 1fr / 1fr 1fr 1fr 1fr";
            let countOfSameCards = [0, 0, 0, 0, 0, 0];

            for (let i = 0; i < 12; i++){
                AddCardToGame(template, countOfSameCards);
            }
            break;
        }
        case '4x6':{
            
            template.style.gridTemplate = "1fr 1fr 1fr 1fr / 1fr 1fr 1fr 1fr 1fr 1fr";
            let countOfSameCards = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0];

            for (let i = 0; i < 24; i++){
                AddCardToGame(template, countOfSameCards);
            }
            break;
        }
        case '5x8':{
            
            template.style.gridTemplate = "1fr 1fr 1fr 1fr 1fr / 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr";
            let countOfSameCards = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            for (let i = 0; i < 40; i++){
                AddCardToGame(template, countOfSameCards);
            }
            break;
        }
    }
}
function GameSetup() {
    const select = document.getElementById('game-size');
    const label = document.querySelector('label');

    games.textContent = Number(games.textContent) + 1;
    select.disabled = true;
    startButton.disabled = true;
    restartButton.disabled = false;
    label.style.color = 'rgb(120, 120, 120)';
}
function AddClassNumberToDiv(div,countOfSameCards){
    while(true){
        let connectedCardsClass = Math.floor(Math.random() * countOfSameCards.length);

        if (countOfSameCards[connectedCardsClass] != 2){

            countOfSameCards[connectedCardsClass] ++;

            div.setAttribute('class', 'numberOfConnect' + connectedCardsClass)

            break;
        }
    }  
}
function FirstCardSelected(div, clickedButtonClass) {
    const divs = document.querySelectorAll('div');
    divs.forEach((div) => {
        if(div.className != 'found'){
            div.textContent = "";
        }
    });

    showNumberOfCard(div);
    clickedButtonClass = div.className;
    div.setAttribute('class', 'selected');
    return clickedButtonClass;
}
function SecondCardSelectedCorrect(div,clickedButtonClass){
    showNumberOfCard (div);
    const firstDiv = document.querySelector('.selected');
    clickedButtonClass = 0;

    div.setAttribute('class', 'found');
    firstDiv.setAttribute('class', 'found');

    attempts.textContent = Number(attempts.textContent) + 1;

    div.onclick = 0;
    firstDiv.onclick = 0;
    return clickedButtonClass;
}
function SecondCardSelectedWrong(div,clickedButtonClass){
    const firstDiv = document.querySelector('.selected');
    firstDiv.setAttribute('class', clickedButtonClass);
    showNumberOfCard (div, clickedButtonClass);

    attempts.textContent = Number(attempts.textContent) + 1;

    clickedButtonClass = 0;

    return clickedButtonClass;
}
function CardClick(div,clickedButtonClass){
    switch(clickedButtonClass){
                
        case 0:{                
            clickedButtonClass = FirstCardSelected(div, clickedButtonClass);                            
            break;
        }
        case div.className:{                
            clickedButtonClass = SecondCardSelectedCorrect(div,clickedButtonClass);
            break;
        }
        default:{                
            clickedButtonClass = SecondCardSelectedWrong(div,clickedButtonClass);
            break;
        }
    }        
    return clickedButtonClass;
}
function AddCardToGame(template, countOfSameCards){
    const div = document.createElement('div');

    AddClassNumberToDiv(div,countOfSameCards);
    
    div.onclick = () => {
                
        clickedButtonClass = CardClick(div,clickedButtonClass);
                     
    };
    template.appendChild(div);
}