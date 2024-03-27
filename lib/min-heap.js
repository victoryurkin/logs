"use strict";

module.exports = class MinHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(i) { return Math.floor((i - 1) / 2); }
  getLeftChildIndex(i) { return 2 * i + 1; }
  getRightChildIndex(i) { return 2 * i + 2; }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  insert(entry) {
    this.heap.push(entry);
    let index = this.heap.length - 1;
    let parent = this.getParentIndex(index);

    while (index > 0 && this.heap[parent].date > this.heap[index].date) {
      this.swap(parent, index);
      index = parent;
      parent = this.getParentIndex(index);
    }
  }

  extractMin() {
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapify(0);
    return min;
  }

  heapify(i) {
    const left = this.getLeftChildIndex(i);
    const right = this.getRightChildIndex(i);
    let smallest = i;

    if (left < this.heap.length && this.heap[left].date < this.heap[smallest].date) {
      smallest = left;
    }

    if (right < this.heap.length && this.heap[right].date < this.heap[smallest].date) {
      smallest = right;
    }

    if (smallest !== i) {
      this.swap(i, smallest);
      this.heapify(smallest);
    }
  }

  isEmpty() {
    return this.heap.length < 2;
  }
}