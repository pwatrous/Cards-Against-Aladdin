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
            ticker: string,
            shares: int,
        }
        */

        //reset / set to init state, server sends init 4 cards
        //round[0-3] -> client sends Ticker+Stock, server replies send new card, and bot card
        //round 4: Client sends ticker+stock, server replies with wild card, client calculates leftover stock for wild + 1% on savings, sends final tickers+weight
        //winner stage // server calculates $ for server, $ client, send tickers, weights for bot
        switch(data.round){
            case -1: //reset
                //init
                //roll a quarter
                let quarter = aladdin.defineQuarter(Math.floor(Math.random() * 40)); //0-39 rolled for quarter
                let deck = aladdin.getDeck(quarter); 
                //broadcast rolled quarter

                //'bot' object data held client side
                //'player' object data held client side as well
            case 0:
            case 1:
            case 2:
            case 3:
                //do a regular round
            case 4:
                //wildcard round    

        }
 







        wss.broadcast(data)
        console.log('data broadcast to clients')
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
