

const cards = document.querySelectorAll('.card');
const flips = document.querySelector('.status div:nth-child(2) span:last-child');
const btnRefresh = document.querySelector('button');
const xCards = document.querySelector('.status div:nth-child(3) span:last-child');
const timeTagSec = document.querySelector(".sec");
const timeTagMin = document.querySelector(".min");

let startTime = min = showSec = 0;
let timer;
let isPlaying = false;
let flipsCount = 0;
let xCardsCount = 36;
let cardOne, cardTwo;
let disableClicking = false; // user would not be able to click on any card until the clicked card was unfliped


function initTimer() {
    if(xCardsCount == 0) return clearInterval(timer);
    startTime++;
    showSec = startTime % 60;
    min = Math.trunc(startTime / 60);
    timeTagSec.innerText = showSec < 10 ? `0${showSec}` : showSec;
    timeTagMin.innerText = min < 10 ? `0${min}` : min;
}


function flipCard(e) {
    if(!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }

    let clickedCard = e.target;

    if(clickedCard !== cardOne && !disableClicking) {

        clickedCard.classList.add('flip');
        flips.textContent = ++flipsCount;

        if(!cardOne) return cardOne = clickedCard;

        cardTwo = clickedCard;
        disableClicking = true;
        let cardOneImg = cardOne.querySelector('img').src,
        cardTwoImg = cardTwo.querySelector('img').src;

        matchCards(cardOneImg, cardTwoImg);
    }
};


function matchCards(img1, img2) {
    if(img1 === img2) { // if two cards matched together
        xCardsCount -= 2;
        xCards.textContent = (xCardsCount);
        if(xCardsCount == 0) { // 18 * 2 = 36 cards
            return clearInterval(timer);
        }
        cardOne.removeEventListener('click', flipCard); // user should not be able to click on these cards again
        cardTwo.removeEventListener('click', flipCard);
        cardOne = cardTwo = "";
        return disableClicking = false; // if two cards matched the bottom codes should not be executed 
    }

    // if two cards did not match, cards would a bit shake after 0.4 sec
    setTimeout(() => { 
        cardOne.classList.add('shake');
        cardTwo.classList.add('shake');
    }, 400);

    setTimeout(() => { // removing shake and flip classes from both cards after 1.2 sec
        cardOne.classList.remove('shake', 'flip');
        cardTwo.classList.remove('shake', 'flip');
        cardOne = cardTwo = ""; // setting cards value to blank
        disableClicking = false;
    }, 1200);
}

function shuffleCards() {
    startTime = min = showSec = 0;
    isPlaying = false;
    flipsCount = 0;
    xCardsCount = 36;
    cardOne = cardTwo = "";
    disableClicking = false;
    flips.textContent = flipsCount;
    xCards.textContent = xCardsCount;
    clearInterval(timer);
    timeTagSec.innerText = `0${showSec}`;
    timeTagMin.innerText = `0${min}`;


    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
               1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
        arr.sort(() => Math.random() > 0.5 ? 1 : -1); // sorting randomly

    cards.forEach((card, index) => {
        card.classList.remove('flip');
        let imgTag = card.querySelector('img');
        setTimeout(() => {  // for clicking refresh button, first it will be unflipped then set the emoji into it
            imgTag.src = `images/img-${arr[index]}.png`;
        }, 400);
        card.addEventListener('click', flipCard);
    });
}



shuffleCards();

btnRefresh.addEventListener('click', shuffleCards);