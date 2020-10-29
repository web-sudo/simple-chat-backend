// include dependencies:
const fs = require('fs');
const https = require('https')
const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;

const serverConfig = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
};

// port number:
const port = 5500

// create server, and have listen on port 9600:
const httpsServer = https.createServer(serverConfig)

httpsServer.listen(port, function() {
    console.log("Server listening on port " + port)
});

const wss = new WebSocketServer({server: httpsServer});

// on server request, send message:
wss.on("connection", function(ws) {
    ws.on('message', function(message) {
        // Broadcast any received message to all clients
        console.log('received: %s', message);
        wss.broadcast(message);
    });
});

wss.broadcast = function(data) {
    this.clients.forEach(function(client) {
      if(client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
};
