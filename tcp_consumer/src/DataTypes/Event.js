class Event {
  constructor(header, body) {
    if (header.type !== 'event') {
      throw new Error("Expected type 'event', got: " + header.type);
    }
    this.header = header;
    this.body = {};
    this.body.eventId = body[0];
    this.body.category = body[1];
    this.body.subCategory = body[2];
    this.body.name = body[3];
    this.body.startTime = parseInt(body[4]);
    this.body.displayed = body[5];
    this.body.suspended = body[6];
  }
}


module.exports = { Event };
