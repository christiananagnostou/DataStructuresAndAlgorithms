class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BST {
  constructor(node = null) {
    this.root = node;
  }

  add(data) {
    if (!this.root) return (this.root = new Node(data));

    let curr = this.root;

    const searchTree = function (node) {
      // If data is less than node data
      if (data < node.data) {
        return !node.left ? (node.left = new Node(data)) : searchTree(node.left);
      }
      // If data is greater than node data
      else if (data > node.data) {
        return !node.right ? (node.right = new Node(data)) : searchTree(node.right);
      }
      // If node is equal to node data
      else {
        return null;
      }
    };
    return searchTree(curr);
  }

  remove(data) {
    const removeNode = function (node, data) {
      if (!node) return null;

      if (node.data === data) {
        // If node has no children;
        if (!node.right && !node.left) {
          return null;
        }
        // Node has no right
        if (!node.right) {
          return node.left;
        }
        // Node has no left
        if (!node.left) {
          return node.right;
        }
        // Node has both children
        let temp = node.right;
        while (temp.left) {
          temp = temp.left;
        }
        node.data = temp.data;
        return removeNode(node.right, temp.data);
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      }
    };
    this.root = removeNode(this.root, data);
  }

  findMin() {
    if (!this.root) return null;

    let curr = this.root;
    while (curr.left) {
      curr = curr.left;
    }
    return curr.data;
  }

  findMax() {
    if (!this.root) return null;

    let curr = this.root;
    while (curr.right) {
      curr = curr.right;
    }
    return curr.data;
  }

  isPresent(data) {
    if (!this.root) return false;

    let curr = this.root;
    while (curr) {
      if (data === curr.data) {
        return true;
      }

      if (data < curr.data) {
        curr = curr.left;
      } else if (data > curr.data) {
        curr = curr.right;
      }
    }
    return false;
  }

  isBalanced() {
    return this.findMaxHeight() - this.findMinHeight() <= 1;
  }

  findMinHeight(node = this.root) {
    if (!node) return -1;

    let left = this.findMinHeight(node.left);
    let right = this.findMinHeight(node.right);

    return left < right ? left + 1 : right + 1;
  }

  findMaxHeight(node = this.root) {
    if (!node) return -1;

    let left = this.findMaxHeight(node.left);
    let right = this.findMaxHeight(node.right);

    return left > right ? left + 1 : right + 1;
  }
}

const Tree = new BST();

Tree.add(9);
Tree.add(4);
Tree.add(17);
Tree.add(3);
Tree.add(6);
Tree.add(22);
Tree.add(5);
Tree.add(7);
Tree.add(20);

Tree.add(10);
Tree.remove(10);

console.log(Tree.isPresent(22)); // true
console.log(Tree.isPresent(99)); // false

console.log(Tree.findMin()); //3
console.log(Tree.findMax()); // 22

console.log(Tree.findMinHeight()); // 1
console.log(Tree.findMaxHeight()); // 3
console.log(Tree.isBalanced()); // false

Tree.add(10);

console.log(Tree.findMinHeight()); // 2
console.log(Tree.findMaxHeight()); // 3
console.log(Tree.isBalanced()); // true
