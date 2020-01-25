var EventModel = require('../MongoDBModels/EventModel').EventModel;

let writeEventToStore = function(eventData) {
  let eventModelInstance = new EventModel({
    event: {
      header: {
        msgId: eventData.header.msgId,
        operation: eventData.header.operation,
        type: eventData.header.type,
        timestamp: eventData.header.timestamp,
      },
      body: {
        eventId: eventData.body.eventId,
        category: eventData.body.category,
        subCategory: eventData.body.subCategory,
        name: eventData.body.name,
        startTime: eventData.body.startTime,
        displayed: eventData.body.displayed,
        suspended: eventData.body.suspended,
      },
    },
  });
  eventModelInstance.save();
};

module.exports = { writeEventToStore };
