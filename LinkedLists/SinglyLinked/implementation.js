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

  append = function (data) {
    const newNode = new Node(data);
    this.size++;

    if (!this.head) this.head = newNode;
    else this.getTail().next = newNode;
  };

  prepend = function (data) {
    const newNode = new Node(data);
    this.size++;

    if (!this.head) return (this.head = newNode);

    newNode.next = this.head;
    this.head = newNode;
  };

  getIndex = function (index) {
    if (index < 0 || index >= this.size) return new Error(`Index: ${index} is out of bounds`);

    let count = 1;
    let curr = this.head;
    while (curr && count <= index) {
      count++;
      curr = curr.next;
    }
    return curr;
  };

  insertAtIndex = function (data, index) {
    if (index < 0 || index > this.size) return new Error(`Index: ${index} is out of bounds`);

    if (index === 0) return this.prepend(data);
    if (index === this.size) return this.append(data);

    const prev = this.getIndex(index - 1);
    const temp = prev.next;
    prev.next = new Node(data, temp.next);
    this.size++;
  };

  getTail = function () {
    let curr = this.head;
    while (curr.next) {
      curr = curr.next;
    }
    return curr;
  };

  map = function (callback) {
    let curr = this.head;
    while (curr) {
      callback(curr);
      curr = curr.next;
    }
  };

  toArray = function () {
    let res = [];
    this.map((node) => res.push(node.data));
    return res;
  };

  printArray = function () {
    console.log(this.toArray());
  };
}

const LL = new LinkedList();

LL.append(1);
LL.append(2);
LL.append(3);
LL.append(4);
LL.append(5);
LL.prepend(10);

LL.printArray(); // prints: [10,1,2,3,4,5]

console.log(LL.size); // returns: 6

console.log(LL.getIndex(5)); // returns: Node { data: 5, next: null }
console.log(LL.getIndex(0)); // returns Node { data: 10, next: Node { data: 1, next: Node { data: 2, next: [Node]... } } }
console.log(LL.getIndex(6)); // Error: Index: 6 is out of bounds
console.log(LL.getIndex(-1)); // Error: Index: -1 is out of bounds

LL.insertAtIndex(6, 6);
LL.insertAtIndex(100, 4);

LL.printArray(); // prints: [10, 1, 2, 3, 100, 5, 6]
console.log(LL.size); // returns: 8
