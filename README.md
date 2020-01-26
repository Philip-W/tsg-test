# Technical Test Solution

## Tasks Completed
As a part of my solution I completed the Basic, Intermediate and some of the Advanced Tasks. In it's current state
there are 2 applications, one to read the TCP stream, parse the JSON and write it to Kafka, and one service that consumes data from Kafka and pushes that data into a MongoDB store.

Docker files have been setup to create images for these services however there was an issue getting the services to 
connect to the kafka instance within the docker network using docker compose. Prior to this task I had
not used Kafka before so given additional time I believe I would 
have been able to solve this issue, along with providing a basic front end  . My intention for the front
end would have involved 2 additional services, a database read service provided via a get request using Express, this would allow ease of horizonal scaling for read actions without impacting the write actions, and a simple front end javascript application, likely build in React.

## Technical Choices
For this task I chose to use Node.js, following the tasks suggested I broke the application into two services, 
`tcpConsumer` and `writeDataToNoSQL`, where `tcpConsumer` is responsible for reading from the 
provided TCP stream and parsing the packets into JSON before publishing the objects to a Kafka topic. 

For the `writeDataToNoSQL` service I chose to use Mongoose to interface with a MongoDB instance. Before this 
task I had brief experience with other libraries for interfacing with MongoDB with Node.js but thought Mongoose
would provide a neat interface for handling the data hierachy.

Finally throughout the development process I tried to keep in mind extension of the software. For example, for the `TCPConsumer` class the queue was passed as a dependency to ensure the consumer wasn't too tightly coupled to a particular queue. This would allow for the easy extension of the tcpConsumer app to use different event processing services such as RabbitMQ.

## Extensions 
I had a few thoughts on how I would like to extend the application outside of the suggested front end application that could have been completed given additional time.

### Docker/Multple write instances
As mentioned I completed part of the Advanced task, using Kafka as a event queue between the reads and writes, however I didn't have the time to test this application with multiple instances of the `writeDataToNoSQL` service. On brief investigation I believe this could lead to a race condition due to the short time span between creation of Events and Markets, and attempted writes of Markets into events and Outcomes into Markets. I believe it would be interesting to test this situation and experiment with some different approaches to solving this issue. 

### Test Enhancements
Testing of this application was limited to unit tests of the message parsing. With applications of this nature I find unit testing whereby the services are mocked can to lead to poor test confidence. Given additional time I believe it would be valuable to include integration/component tests where the TCP stream input is controlled and asserting the contents is correctly written to the store. 

## Running the application
The services must currently be started independent of the docker-compose command, using `npm install` and `npm start` within both the `tcpConsumer` and `writeDataToNoSQL` directories. Configuration files are provided in the top level directory of each service, the config defaults point to the service instances provided by the docker-compose file. The tests for `tcpConsumer` can be run using `npm test` following the install command.

Both the full application and unit tests were written on a windows development machine and I had the chance to test it on mac which executed as expected. 
For the unit testing mocha was used, and to verify the data was being written to the MongoDB store correctly I used Mongoku - an app which can be installed 
with npm and run to view the MongoDB contents in a browser.
