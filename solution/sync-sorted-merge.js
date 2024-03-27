const MinHeap = require("../lib/min-heap");

// Simple, straight forward, but inefficient solution
// Used to test the efficiency of the MinHeap solution
const inefficientSolution = (logSources, printer) => {
  let mergedLogs = [];
  for (let i = 0; i < logSources.length; i++) {
    let logEntry = null;
    while((logEntry = logSources[i].pop())) {
      mergedLogs.push(logEntry);
    }
  }

  const sortedLogs = mergedLogs.sort((a, b) => a.date - b.date);

  for (let i = 0; i < sortedLogs.length; i++) {
    printer.print(sortedLogs[i]);
  }

  printer.done();
}

// Solution using the MinHeap
const efficientSolution = (logSources, printer) => {
  const minHeap = new MinHeap();

  // Insert all elements into the min-heap
  for (let i = 0; i < logSources.length; i++) {
    let logEntry = null;
    while((logEntry = logSources[i].pop())) {
      minHeap.insert(logEntry);
    }
  }
  
  // Extract elements from the heap to get them in sorted order
  while (!minHeap.isEmpty()) {
    printer.print(minHeap.extractMin());
  }  
  printer.done();
}

module.exports = (logSources, printer) => {
  // inefficientSolution(logSources, printer);
  efficientSolution(logSources, printer);
  return console.log("Sync sort complete.");
};
