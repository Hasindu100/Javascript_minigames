//Your age in days
/* 
$('#btn1').click(function (){
    var age = prompt("What is your age?");
    result = age*365;
    $('#flex-box-result').html(result);
})

$('#btn2').click(function (){
    $('#flex-box-result').html('');
})
*/

function daysOfAge(){
    var age = prompt('What is your age?');
    result = age * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + result + ' days old.');
    h1.setAttribute('id', 'result');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('flex-box-result').remove();
}

// Chalenge 2: Cat Generator
function generateCat(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "F:\Wallpapers/sad_panda_painting-wallpaper-1280x768.JPG";
    image.setAttribute('width', '200px');
    image.setAttribute('height', '200px');
    div.appendChild(image);
    console.log(Math.floor(Math.random()));
}

// Challenge 3
function rpsGame(yourChoice){
    //console.log(yourChoice.id)
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    console.log("Compurt choise:",botChoice)
    results = decideWinner(humanChoice, botChoice);
    console.log(results)
    message= finalMessage(results);
    console.log(message)
    rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt(){
    return Math.floor(Math.random() *3);
}

function numberToChoice(number){
    return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, botChoice){
    var rpsDatabase = {
        "rock": {'scissors': 1, 'rock': 0.5, 'paper': 0},
        "paper": {'rock': 1, 'paper': 0.5, 'scissors': 0},
        "scissors": {'paper': 1, 'scissors': 0.5, 'rock': 0}
    }
    var yourScore = rpsDatabase[yourChoice][botChoice];
    var computerScore = rpsDatabase[botChoice][yourChoice];
    
    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]){
    if(yourScore === 0){
        return {'message': 'You lost!', 'color': 'red'};
    } else if (yourScore === 0.5){
        return {'message': 'You tied!', 'color': 'yellow'};
    } else {
        return {'message': 'You won!', 'color': 'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imagesDatabase = {
        "rock": document.getElementById('rock').src,
        "paper": document.getElementById('paper').src,
        "scissors": document.getElementById('scissors').src
    }
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var resultDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' width='300px' height='300px' style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1)'>";
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' width='300px' height='300px'style='box-shadow: 0px 10px 50px rgba(243, 30, 24, 1)' >"
    resultDiv.innerHTML = "<h1 style='color:" + finalMessage['color'] + ';padding-top: 100px' + "'>" + finalMessage['message']; +"</h1>";
    
    

    document.getElementById('flex-box-rps').appendChild(humanDiv);
    document.getElementById('flex-box-rps').appendChild(resultDiv);
    document.getElementById('flex-box-rps').appendChild(botDiv);
    
   /* var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + "dsf" + ' days old.');
    h1.setAttribute('id', 'result');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-container-3').appendChild(h1);
    */
}

// Challenge 4

var all_buttons = document.getElementsByTagName('button');

var copyAllButtons =[];
for(let i = 0; i < all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(option){
    if (option.value === 'red'){
        buttonsRed();
    } else if (option.value === 'green'){
        buttonsGreen();
    } else if  (option.value === 'reset'){
        buttonColorReset();
    } else if (option.value === 'random'){
        randomColor();
    }
}

function buttonsRed(){
    for(let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen(){
    for(let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function randomColor(){
    var color = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];

    for(let i = 0; i < all_buttons.length; i++){
        var rand =  Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(color[rand]);
    }
}

function buttonColorReset(){
    for(let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

// Challenge 5
let blackJackGame = {
    "you": {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    "dealer": {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    "cards": [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'],
    "cardsMap": {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1,11]},
    "wins": 0,
    "loses": 0,
    "draws": 0,
    "isStand": false,
    "turnOver": false,
};

const YOU = blackJackGame['you'];
const DEALER = blackJackGame['dealer'];

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');

document.querySelector('#blackjack-hit-btn').addEventListener('click', blacjckHit);
document.querySelector('#blackjack-deal-btn').addEventListener('click', blackjackDeal);
document.querySelector('#blackjack-stand-btn').addEventListener('click', dealerLogic);

function blacjckHit(){
    if (blackJackGame['isStand'] === false) {
        var card = randomCard();
        showCard(card,YOU);
        updateScore(card,YOU);
        showScore(YOU);
    }
}

function showCard(card,activePlayer){
    if (activePlayer['score'] <= 21){
        // var images = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
        let createImage = document.createElement('img');
        createImage.src='images/' + card + '.png';
        document.querySelector(activePlayer['div']).appendChild(createImage);
        //document.getElementById('your-box').appendChild(createImage);
        hitSound.play();
    }
}

function blackjackDeal(){
    if (blackJackGame['turnOver'] === true) {

        blackJackGame['isStand'] = false;

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

        for(let i = 0; i < yourImages.length; i++){
            yourImages[i].remove();
        }

        for(let i = 0; i < dealerImages.length; i++){
            dealerImages[i].remove();
        }
        
        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector(YOU['scoreSpan']).innerHTML = 0;
        document.querySelector(YOU['scoreSpan']).setAttribute('style', 'color:black');
        document.querySelector(DEALER['scoreSpan']).setAttribute('style', 'color:black');
        document.querySelector(DEALER['scoreSpan']).innerHTML = 0;

        document.querySelector('#blackjack-result').textContent = "Let's play!";
        document.querySelector('#blackjack-result').style.color = 'black';

        blackJackGame['turnOver'] = false;
    }
}

function randomCard(){
    let rand = Math.floor(Math.random()*13);
    return blackJackGame['cards'][rand];
}

function updateScore(card, activePlayer){
   /* if(card === 'J'){
        total += 11;
    } else if(card === 'Q'){
        total += 12;
    } else if(card === 'K'){
        total += 13;
    } else if(card === 'A'){
        total += 1;
    } else {
        total += card
    }*/
    //document.getElementById('your-blackjack-result').innerHTML = total;
    if (card === 'A'){
        if (activePlayer['score'] + blackJackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackJackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackJackGame['cardsMap'][card][0];
        }
    } else {
        activePlayer['score'] += blackJackGame['cardsMap'][card];
    } 
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).innerHTML = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
    blackJackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackJackGame['isStand'] === true){
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    
    blackJackGame['turnOver'] = true;
    showWinner(computeWinner());
}

var wins = 0;
var loses = 0
var draws = 0


function computeWinner(){
    let winner;
    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
            blackJackGame['wins']++;
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']) {
            blackJackGame['loses']++
            winner = DEALER;
        } else if (YOU['score'] === DEALER['score']) {
            blackJackGame['draws']++;
        }
    } else if (YOU['score'] > 21 && DEALER['score'] <=21) {
        winner = DEALER;
    } else if (YOU['score'] > 21 && DEALER['score'] > 21){
        
    }

    return winner;
}

function showWinner(winner) {
    let message, messageColor;

    if (winner === YOU) {
        document.querySelector('#wins').textContent = blackJackGame['wins'];
        message = 'You won!';
        messageColor = 'green';
        winSound.play();
    } else if (winner === DEALER) {
        document.querySelector('#loss').textContent = blackJackGame['loses'];
        message = 'You lost!';
        messageColor = 'red';
        lossSound.play();
    } else {
        document.querySelector('#draws').textContent = blackJackGame['draws'];
        message = 'You drew!';
        messageColor = 'yellow';
    }

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;

}