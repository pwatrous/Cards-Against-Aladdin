const fs = require('fs');
const request = require('request');
const brURL = "https://test3.blackrock.com/tools/hackathon"; 
const quandl = "7yaeVMVLRpzz6-YbfjK-"

let deck = []; //objects of each stock

export function getDeck(quarter){
    //read file
    tickers = fs.readFileSync("../ticker.txt", 'utf-8').split("\n"); //array of tickerrs
    deck = await tickers.map(function(ticker){
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

export async function getReturn(ticker, stocks, quarter){
    let year = quarter.substr(0,3)
    let endtime = year;
    switch(quarter.substr(4,7)){
        case "0101":
            year.concat("0131");
            break;
        case "0401":
            year.concat("0430");
            break;
        case "0701":
            year.concat("0731");
            break;
        case "1001":
            year.concat("1031");
            break;
    }

    let returnrate = request() // fetch from aladdin for that ticker over that quarter
    return returnrate*stocks;
}