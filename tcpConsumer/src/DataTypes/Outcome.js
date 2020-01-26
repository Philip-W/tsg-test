class Outcome {
  constructor(header, body){
    if (header.type !== 'outcome') {
      throw new Error("Expected type 'outcome', got: " + header.type);
    }
    this.header = header;
    this.body = {};
    this.body.marketId = body[0];
    this.body.outcomeId = body[1];
    this.body.name = body[2];
    this.body.price = body[3];
    this.body.displayed = body[4];
    this.body.suspended = body[5];
  }
}

module.exports = { Outcome };
