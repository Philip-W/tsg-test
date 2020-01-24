let net = require('net');
let parseStringToJSON = require('./PacketHandling/RawPacketProcessing').parseStringToJSON;
let parsePacketBlockIntoList = require('./PacketHandling/RawPacketProcessing').parsePacketBlockIntoList;

class TCPConsumer {

    constructor(host = '127.0.0.1', port = 8282, queue) {
        this.port = port;
        this.host = host;
        this.queue = queue;
        this.client = new net.Socket();
        this.client.on('data', packetBlock => this.handlePackets(packetBlock));
        this.client.on('close', () => {console.log('Connection closed')})
    }

    handlePackets(packetBlock) {
        var rawPacketList = parsePacketBlockIntoList(packetBlock);
        rawPacketList.forEach((rawPacket) =>  {
            var parsedJsonAsString = JSON.stringify(parseStringToJSON(rawPacket));
            this.queue.publishMessageToQueue(parsedJsonAsString);
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