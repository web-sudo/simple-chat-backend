// include dependencies:
let websocket = require("websocket").server
let http = require("http")

// port number:
let port = 5500

// create server, and have listen on port 9600:
let server = http.createServer()

server.listen(port, function() {
    console.log("Server listening on port " + port)
});

let ws_server = new websocket({
    httpServer: server
});


// on server request, send message:
ws_server.on("request", function(req) {
    let connection = req.accept(null, req.origin)

    connection.on("message", function(message) {
        ws_server.broadcast(message.utf8Data)
    });
});
