const WebSocketServer = require('ws').Server
const http = require('http')
const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.use(express.static(__dirname + '/'))

const server = http.createServer(app)
server.listen(port)

console.log('http server listening on %d', port)

let webSockets = []
let viewers = []
let client = null

let wss = new WebSocketServer({server: server})
console.log('websocket server created')
////////////////////////////////////////////////////////////////////////////////////////
const bot = require('js/bot');



///////////////////////////////////////////////////////////////////////////////////////
wss.on('connection', function(ws) {
    console.log('websocket connection open')

    ws.on('message', function(data, flags) {
        console.log(data)
        let content = JSON.parse(data)
        // Our only message is player card choice
        /*
        {
            round: int,
            played : [int, int, int] //index, cash, stocks
        }
        */

        //reset / set to init state, server sends init 4 cards
        //round[0-3] -> client sends Ticker+Stock, server replies send new card, and bot card
        //round 4: Client sends ticker+stock, server replies with wild card, client calculates leftover stock for wild + 1% on savings, sends final tickers+weight
        //winner stage // server calculates $ for server, $ client, send tickers, weights for bot
        let deck;
        switch(data.round){
            case -1: //reset
                //init
                //roll a quarter
                let quarter = aladdin.defineQuarter(Math.floor(Math.random() * 40)); //0-39 rolled for quarter
                deck = aladdin.getDeck(quarter); 
                bot.init(deck, quarter);
                player.init(deck, quarter);
                //broadcast rolled quarter
                wss.broadcast({
                    quarter : quarter,
                    playerhand : player.getPlayerHand();
                });
                break;
            case 0:
            case 1:
            case 2:
            case 3:
                //do a regular round
                player.playcard(data.played[0], data.played[1], data.played[2]);
                wss.broadcast({
                    cash : player.getPlayerCash();
                    hand : player.getPlayerHand();
                });
                break;
            case 4:
                player.playcard(data.played[0], data.played[1], data.played[2]);
                //wildcard round
                let wc = deck[Math.floor(Math.random() * deck.length)];
                player.playWC(wc);

                wss.broadcast({
                    cash: player.getPlayerCash();
                    wildcard : wc;
                    botCards = bot.getPlayed();
                    botFinal : bot.getFinalYield();
                    playerFinal : player.getFinalYield();
                });
                break;

        }

        // wss.broadcast(data)
        //console.log('data broadcast to clients')
    })

    ws.on('close', function() {
        console.log('websocket connection closed')
    })

    ws.on('error', function(err) {
        console.log('shit, ' + err)
    })

    webSockets.push(ws)
    if (!client) {
        client = ws
    }
})

wss.broadcast = function(data) {
    for (var i in this.clients)
        this.clients[i].send(data)
}
