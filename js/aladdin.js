const fs = require('fs');
const request = require('request');
const brURL = "https://test3.blackrock.com/tools/hackathon"; 
const quandl = "7yaeVMVLRpzz6-YbfjK-"

let deck = []; //objects of each stock

export function getDeck(quarter){
    //read file
    tickers = fs.readFileSync("../ticker.txt", 'utf-8').split("\n"); //array of tickerrs
    deck = tickers.map(function(ticker){
        ticker = ticker.split(","); //array of info for ticker
        let tickerJson = {
            ticker : ticker[0],
            name : ticker[1],
            industry: ticker[3],
            price: getStockPrice(ticker, quarter);
        }
    });
    return deck;
}

export deckShuffle(deck){
    let currentIndex = deck.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = deck[currentIndex];
        deck[currentIndex] = deck[randomIndex];
        deck[randomIndex] = temporaryValue;
    }

    return deck;
}


export function getStockPrice(ticker, quarter){
    
}

export function defineQuarter(quarter){
    //int 0 - 39
    let year = 2005 + Math.floor(quarter/4);
    let quarter = quater % 4;
    let strQuarter = year.toString();

    switch(quarter){
        case 0:
            strQuarter.concat("0101");
            break;
        case 1:
            strQarter.concat("0401");
            break;
        case 2:
            strQuarter.concat("0701");
            break;
        case 3:
            strQarter.concat("1001");
            break;
    }

    return strQuarter;   //yyyymmdd
}