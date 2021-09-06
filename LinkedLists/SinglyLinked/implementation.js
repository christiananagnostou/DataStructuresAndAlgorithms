class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor(node = null) {
    this.head = node;
    this.size = node ? 1 : 0;
  }

  append(data) {
    const newNode = new Node(data);
    this.size++;

    if (!this.head) this.head = newNode;
    else this.getTail().next = newNode;
  }

  prepend(data) {
    const newNode = new Node(data);
    this.size++;

    if (!this.head) return (this.head = newNode);

    newNode.next = this.head;
    this.head = newNode;
  }

  getIndex(index) {
    if (index < 0 || index >= this.size) return new Error(`Index: ${index} is out of bounds`);

    let count = 1;
    let curr = this.head;
    while (curr && count <= index) {
      count++;
      curr = curr.next;
    }
    return curr;
  }

  insertAtIndex(data, index) {
    if (index < 0 || index > this.size) return new Error(`Index: ${index} is out of bounds`);

    if (index === 0) return this.prepend(data);
    if (index === this.size) return this.append(data);

    const prev = this.getIndex(index - 1);
    const temp = prev.next;
    prev.next = new Node(data, temp.next);
  }

  removeAtIndex(index) {
    if (index < 0 || index >= this.size) return new Error(`Index: ${index} is out of bounds`);

    if (index === 0) {
      const remove = this.head;
      this.head = remove.next;
      remove.next = null;
    } else {
      const prev = this.getIndex(index - 1);
      const remove = prev.next;
      prev.next = remove.next;
      remove.next = null;
    }
    this.size--;
  }

  getTail() {
    let curr = this.head;
    while (curr.next) {
      curr = curr.next;
    }
    return curr;
  }

  forEach(callback) {
    let curr = this.head;
    while (curr) {
      callback(curr);
      curr = curr.next;
    }
  }

  toArray() {
    let res = [];
    this.forEach((node) => res.push(node.data));
    return res;
  }

  printArray() {
    console.log(this.toArray());
  }

  reverse() {
    if (!this.head) return null;

    let curr = this.head;
    let prev = null;

    while (curr) {
      let temp = curr.next;
      curr.next = prev;
      prev = curr;
      curr = temp;
    }
    this.head = prev;
    return prev;
  }
}
module.exports = LinkedList;

// const LL = new LinkedList();

// LL.append(1);
// LL.append(2);
// LL.append(3);
// LL.append(4);
// LL.append(5);
// LL.prepend(10);

// LL.printArray(); // prints: [ 10, 1, 2, 3, 4, 5 ]

// console.log(LL.size); // returns: 6

// console.log(LL.getIndex(5)); // returns: Node { data: 5, next: null }
// console.log(LL.getIndex(0)); // returns Node { data: 10, next: Node { data: 1, next: Node { data: 2, next: [Node]... } } }
// console.log(LL.getIndex(6)); // Error: Index: 6 is out of bounds
// console.log(LL.getIndex(-1)); // Error: Index: -1 is out of bounds

// LL.insertAtIndex(6, 6);
// LL.insertAtIndex(100, 4);
// LL.insertAtIndex(69, 69); // Won't insert and returns an Error

// LL.printArray(); // prints: [ 10, 1, 2, 3, 100, 5, 6 ]

// console.log(LL.size); // returns: 7

// LL.removeAtIndex(0);
// LL.removeAtIndex(3);
// LL.removeAtIndex(4);

// LL.printArray(); // prints: [ 1, 2, 3, 5 ]

// LL.reverse();

// LL.printArray(); //prints: [ 5, 3, 2, 1 ]
