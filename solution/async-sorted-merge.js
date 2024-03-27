"use strict";

// Print all entries, across all of the *async* sources, in chronological order.

const MinHeap = require("../lib/min-heap");

// Simple, straight forward, but inefficient solution
// Used to test the efficiency of the MinHeap solution
const inefficientSolution = async (logSources, printer) => {
  let mergedLogs = [];
  for (let i = 0; i < logSources.length; i++) {
    let logEntry = null;
    while((logEntry = await logSources[i].popAsync())) {
      mergedLogs.push(logEntry);
    }
  }

  const sortedLogs = mergedLogs.sort((a, b) => a.date - b.date);

  for (let i = 0; i < sortedLogs.length; i++) {
    printer.print(sortedLogs[i]);
  }

  printer.done();
}

// Solutions using the MinHeap

const getAllLogsFromSource = async (logSource) => {
  let logs = [];
  let logEntry = null;
  while((logEntry = await logSource.popAsync())) {
    logs.push(logEntry);
  }
  return logs;
}

const efficientSolution = async (logSources, printer) => {
  const minHeap = new MinHeap();
  const promises = [];

  // Insert all elements into the min-heap
  for (let i = 0; i < logSources.length; i++) {
    promises.push(getAllLogsFromSource(logSources[i]));
  }

  Promise.all(promises).then((logs) => {
    logs.forEach((log) => {
      log.forEach((entry) => {
        minHeap.insert(entry);
      });
    });

    // Extract elements from the heap to get them in sorted order
    while (!minHeap.isEmpty()) {
      printer.print(minHeap.extractMin());
    }  
    printer.done();
  });  
}

module.exports = (logSources, printer) => { 
  return new Promise((resolve, reject) => {
      // inefficientSolution(logSources, printer).then(() => {
      //   resolve(console.log("Async sort complete."));
      // });

      efficientSolution(logSources, printer).then(() => {
        resolve(console.log("Async sort complete."));
      });
  });
};
