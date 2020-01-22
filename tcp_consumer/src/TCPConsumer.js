let net = require('net');
let Packet = require('./Packet').Packet;

const newLineMatcher = /\r?\n/;

class TCPConsumer {

    constructor(host = '127.0.0.1', port = 8282) {
        this.port = port;
        this.host = host;
        this.client = new net.Socket();
        this.client.on('data', packetBlock => this.parsePacketBlock(packetBlock));
        this.client.on('close', () => {console.log('Connection closed')})
    }

    parsePacketBlock(packetBlock) {
        var rawPackets = packetBlock.toString().split(newLineMatcher).filter(packet => packet.length > 0) // Remove end of message lines 
        rawPackets.forEach(function(rawPacket) {
            var packet = new Packet(rawPacket);
            console.log(packet.toJson());
        })
    }

    startReceivingPackets() {
        this.client.connect(this.port, this.host, function() {
            console.log('Connected');
        });
    }
}

module.exports = {
    TCPConsumer
}