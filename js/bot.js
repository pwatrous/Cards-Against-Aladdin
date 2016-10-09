//imports
    const aladdin = require('./aladdin');
        

//variables
let hand = [];
let deck = [];
let quarter = "";
let cash = 100000;
let topcardondeck = 3; //increment on each card draw
let playedhand = [];

//functions
export function init(d, q){
    cash = 100000;
    quarter = q;
    deck = aladdin.deckShuffle(d);
    playedhand = [];
    
    //draw inital hand
    drawcard(0);
    drawcard(1);
    drawcard(2);
}

export function drawcard(i){
    hand[i] = deck[topcardondeck];
    topcardondeck++;//check to make sure it doesn't go out of bounds
}

export function playcard(i, c, s){ //index of hand, cash spent, stock purchased
    cash -= c;
    playedhand.append([hand[i], c, s]); //([0,1,2], stock)
    drawcard(i);
}

export function playWildcard(card, c, s){
    playedhand.append([card, cash, stock]);
    cash -=cash;
}

export function finalearnings(){
    //leftover cash = 1% yield
    let finalyield = cash * 0.01;
    
    /*    
    playedhand.map(function(card_tuple){
        //lookup return for quarter, multiply by stocks
        finalyield += aladdin.getReturn(card_tuple[0].ticker, card_tuple[2], quarter); //ticker, stocks, quarter 
    });*/

    finalyield += await playedhand.reduce(function(previousValue, currentValue, currentIndex, array) {
        let card_tuple = playedhand[currentIndex];
        return await aladdin.getReturn(card_tuple[0].ticker, card_tuple[2], quarter);
    });

    return finalyield;
}

