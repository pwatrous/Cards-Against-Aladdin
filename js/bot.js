//imports
    const aladdin = require('./aladdin');
    

//variables
let hand = [];
let deck = [];
let quarter = "";

//functions
export init(deck, quarter){
    deck = aladdin.deckShuffle(quarter);

    //draw inital hand
    hand = [deck[0], deck[1], deck[2]];

}