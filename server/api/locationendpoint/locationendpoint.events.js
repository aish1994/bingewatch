/**
 * Locationendpoint model events
 */

'use strict';

import {EventEmitter} from 'events';
import Locationendpoint from './locationendpoint.model';
var LocationendpointEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
LocationendpointEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Locationendpoint.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    LocationendpointEvents.emit(event + ':' + doc._id, doc);
    LocationendpointEvents.emit(event, doc);
  }
}

export default LocationendpointEvents;
