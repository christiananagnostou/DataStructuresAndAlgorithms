class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BT {
  constructor(root = null) {
    this.root = root;
  }

  add(data) {
    if (!data) return;

    const newNode = new Node(data);

    if (!this.root) return (this.root = newNode);

    const Q = [];
    Q.push(this.root);

    while (Q.length) {
      const node = Q.shift();

      if (!node.left) return (node.left = newNode);
      if (!node.right) return (node.right = newNode);

      node.left && Q.push(node.left);
      node.right && Q.push(node.right);
    }
  }

  levelOrder() {
    if (!this.root) return [];

    let res = [];
    let Q = [];
    Q.push(this.root);

    while (Q.length) {
      const node = Q.shift();
      res.push(node.data);
      node.left && Q.push(node.left);
      node.right && Q.push(node.right);
    }
    return res;
  }

  /**
   * Constructs a binary tree from an array representation.
   *
   * @param { Array<number | null> } arr Values must either be a truthy value or null. Null values represent a null leaf for the corresponding node.
   * @returns { Node } The returned tree may or may not be a complete binary tree.
   */
  buildFromArray(arr) {
    if (this.root)
      throw new Error("This tree already exists. Create a new binary tree and try again.");

    if (arr[0] == null) return null;

    const getFirstElem = () => arr.shift();

    const root = new Node(getFirstElem());

    let Q = [root];

    while (arr.length) {
      let curr = Q.shift();

      let leftVal = getFirstElem();
      let rightVal = getFirstElem();
      const leftNode = typeof leftVal === "number" ? new Node(leftVal) : null;
      const rightNode = typeof rightVal === "number" ? new Node(rightVal) : null;

      curr.left = leftNode;
      curr.right = rightNode;

      leftVal != null && Q.push(leftNode);
      rightVal != null && Q.push(rightNode);
    }

    this.root = root;
  }
}

module.exports = BT;

// const Tree = new BT();

// Tree.buildFromArray([5, 1, 4, 1, null, null, 3]);
// console.log(Tree.root);
// console.log(Tree.levelOrder());
