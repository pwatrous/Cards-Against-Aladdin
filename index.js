var WebSocketServer = require('ws').Server
var http = require('http')
var express = require('express')
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + '/'))

var server = http.createServer(app)
server.listen(port)

console.log('http server listening on %d', port)

var webSockets = []
var viewers = []
var player = null
var client = null

var wss = new WebSocketServer({server: server})
console.log('websocket server created')

wss.on('connection', function(ws) {
    console.log('websocket connection open')

    ws.on('message', function(data, flags) {
        console.log(data)
        var content = JSON.parse(data)
        id = content.id || content.client

        if (content.signal === 'start') {
            console.log(id)
            if (player !== null) {
                player = 
            } else if (id.includes('web')) {
                viewers.push(id)
            }
            var pool = {
                signal: 'clients',
                viewers: viewers,
                performers: performers
            }
            // send the current list of viewers and performers
            ws.send(JSON.stringify(pool))
        } else if (content.signal === 'chat') {
            // log chat
        }

        wss.broadcast(data)
        console.log('data broadcast to clients')
    })

    ws.on('close', function() {
        console.log('websocket connection closed')
    })

    ws.on('error', function(err) {
        console.log('shit ' + err)
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

/*
wss.broadcastToStage = function(data) {
    for (var i in this.clients) {
        if(data.client.includes(''))
        this.clients[i].send(data)
    }
}*/
