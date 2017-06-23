const NodeHelper = require("node_helper");
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 42001 }); // Random port


module.exports = NodeHelper.create({
	start: function() {
        var self = this;
        
        this.sendSocketNotification("ACTION", "TEST");
        
        // FUCK YOU FOR NOT PROPERLY DOCUMENTING YOUR IO CLASS
        wss.on('connection', function connection(ws, req) {
            
            var ip = req.connection.remoteAddress;
            if (ip === "::1") {
                ws.on('message', function incoming(message) {
                    console.log('received: %s', message);
                    self.sendSocketNotification("ACTION", message);
                });
            }

        });
	},
    
});
