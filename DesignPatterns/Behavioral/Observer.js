/**
 * Observer Pattern
 *
 * The Observer pattern is more popularly known as the Publish/Subscribe pattern.
 * It is a design pattern which allows an object (known as a subscriber) to
 * watch another object (the publisher), where we provide a means for the subscriber
 * and publisher to form a listen and broadcast relationship.
 *
 */

var pubsub = {};

(function (q) {
  var topics = {};

  var subUid = -1;

  // Publish events of interest with a specific topic name and the data to pass along
  q.publish = function (topic, data) {
    if (!topics[topic]) {
      return false;
    }

    var subscribers = topics[topic];
    var len = subscribers ? subscribers.length : 0;

    // Loop through all subscribers and emit their callback
    while (len--) {
      subscribers[len].func(topic, data);
    }

    return this; // The pubsub object literal
  };

  // Subscribe to events of interest with a specific topic name and
  // a callback function, to be executed when the topic/event is observed
  q.subscribe = function (topic, func) {
    if (!topics[topic]) {
      topics[topic] = [];
    }

    var token = (++subUid).toString();

    topics[topic].push({ token: token, func: func });

    return token;
  };

  // Unsubscribe from a specific topic, based on
  // a tokenized reference to the subscription
  q.unsubscribe = function (token) {
    for (var m in topics) {
      if (topics[m]) {
        for (var i = 0; i < topics[m].length; i++) {
          if (topics[m][i].token === token) {
            topics[m].splice(i, 1);
            return token;
          }
        }
      }
    }
    return this;
  };
})(pubsub);

/**
 *
 *
 *  Basic use of publishers and subscribers
 *
 *
 */

var testHandler = function (topic, data) {
  console.log(topic + ": " + data);
};

// Subscribers basically "subscribe" (or listen)
// And once they've been "notified" their callback functions are invoked
var testSubscription = pubsub.subscribe("example1", testHandler);

// At this point, topics looks like this:  { example1: [ { token: '1', func: [Function: testHandler] } ]}

// Publishers are in charge of "publishing" notifications about events
pubsub.publish("example1", "hello world!");
pubsub.publish("example1", ["test", "a", "b", "c"]);
pubsub.publish("example1", [{ color: "blue" }, { text: "hello" }]);

// Unsubscribe if you no longer wish to be notified
pubsub.unsubscribe(testSubscription);
// This will return false
pubsub.publish("example1", "hello again! (this will fail)");
