/*

NOTES: 
 
  Frequently used terminologies for Tree data structure:
    
    Node — A structure which may contain a value or condition, or represent a separate data structure.
    
    Root — The top node in a tree, the prime ancestor.
    
    Child — A node directly connected to another node when moving away from the root, an immediate descendant.
    
    Parent — The converse notion of a child, an immediate ancestor.
    
    Leaf — A node with no children.
    
    Internal node — A node with at least one child.
    
    Edge — The connection between one node and another.
    
    Depth — The distance between a node and the root.
    
    Level — the number of edges between a node and the root + 1
    
    Height — The number of edges on the longest path between a node and a descendant leaf.
    
    Breadth — The number of leaves.
    
    Sub Tree — A tree T is a tree consisting of a node in T and all of its descendants in T.

    Binary Tree — is a tree data structure in which each node has at most two children, which are referred to as the left child and the right child.

    Binary Search Tree — is a special type of binary tree which has the following properties:
        1) The left subtree of a node contains only nodes with keys lesser than the node’s key.
        2) The right subtree of a node contains only nodes with keys greater than the node’s key.
        3) The left and right subtree each must also be a binary search tree.


  Binary Search Tree Terminology:

    Min height - The distance from the root node to the first leaf/internal node that doesn't have 2 children.

    Max height - The distance from the root node to the furthest leaf node.

    Balanced - A tree is considered balanced if the difference between the min height and the max height is 1 or 0.

  
  Tree Traversal Methods:

                  9
                /   \
               /     \
              4       17
             / \     /  \
            3   6   10   22
               / \      /
              5   7    20
    Depth-First Search (DFS) Algorithms:
      1) In Order - (left-current-right): Visit the current node after visiting all nodes inside left subtree but before visiting any node within the right subtree.
                  => 3,4,5,6,7,9,10,17,20,22
      2) Pre Order - (current-left-right): Visit the current node before visiting any nodes inside left or right subtrees.
                  => 9,4,3,6,5,7,17,10,22,20
      3) Post Order - (left-right-current): Visit the current node after visiting all the nodes of left and right subtrees.
                  => 3,5,7,6,4,10,20,22,17,9

    Breadth-First Search (BFS) Algorithm:
      1) Level Order - Visit nodes level-by-level and left-to-right fashion at the same level.
                  => 9,4,17,3,6,10,22,5,7,20
 */

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

  inOrder() {
    if (!this.root) return null;

    const res = [];

    const traverse = function (node) {
      node.left && traverse(node.left);
      res.push(node.data);
      node.right && traverse(node.right);
    };
    traverse(this.root);
    return res;
  }

  preOrder() {
    if (!this.root) return null;

    const res = [];

    const traverse = function (node) {
      res.push(node.data);
      node.left && traverse(node.left);
      node.right && traverse(node.right);
    };
    traverse(this.root);
    return res;
  }

  postOrder() {
    if (!this.root) return null;

    const res = [];

    const traverse = function (node) {
      node.left && traverse(node.left);
      node.right && traverse(node.right);
      res.push(node.data);
    };
    traverse(this.root);
    return res;
  }

  levelOrder() {
    if (!this.root) return null;

    const res = [];
    const Q = [];

    Q.push(this.root);

    while (Q.length > 0) {
      let node = Q.shift();

      res.push(node.data);

      node.left && Q.push(node.left);
      node.right && Q.push(node.right);
    }
    return res;
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

Tree.add(10); // Add 10 to balance out the tree

console.log(Tree.findMinHeight()); // 2
console.log(Tree.findMaxHeight()); // 3
console.log(Tree.isBalanced()); // true

console.log(Tree.inOrder()); // [3, 4, 5, 6, 7, 9, 10, 17, 20, 22]
console.log(Tree.preOrder()); // [9, 4, 3, 6, 5, 7, 17, 10, 22, 20]
console.log(Tree.postOrder()); // [3, 5, 7, 6, 4, 10, 20, 22, 17, 9]
console.log(Tree.levelOrder()); // [9, 4, 17, 3, 6, 10, 22, 5, 7, 20]
