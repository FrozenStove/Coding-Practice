/**
 * Event Counter with Time Buckets
 * Create a class EventCounter:
 *
 * addEvent(timestamp: number)
 *
 * getCountInLast(minutes: number): number
 * Track how many events occurred in the last X minutes using a rolling window.
 */

import { time } from "console";

// type Event = {
//   timeStamp: number;
//   description?: string;
// };

// assume time stamps are a number representation of normal dates

type EventCounterClass = {
  // need some sort of event history
  addEvent: (timestamp: number) => void;
  getCountInLast: (minutes: number) => number;
};

class EventCount implements EventCounterClass {
  eventList: number[] = [];
  getCountInLast(minutes: number) {
    // convert now and last X minutes into number value
    let count = 0;
    const currentDate = new Date();

    const now = currentDate.valueOf();
    const xMinutesAgo = now - 60000 * minutes;

    this.eventList.forEach((timeStamp) => {
      if (timeStamp >= xMinutesAgo && timeStamp <= now) {
        count++;
      }
    });

    return count;
  }
  addEvent(timeStamp: number) {
    this.eventList.push(timeStamp);
  }
}

const eventCounter = new EventCount();

eventCounter.addEvent(1749188665013);
eventCounter.addEvent(1749188665013);
eventCounter.addEvent(1749188665013);
eventCounter.addEvent(1749188265013);
eventCounter.addEvent(1749188565013);

console.log(eventCounter.getCountInLast(10));
