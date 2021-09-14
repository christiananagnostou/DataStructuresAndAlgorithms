const BST = require("./BinarySearchTree/implementation");
const BT = require("./BinaryTree/implementation");

/**
 *
 * This file contains two types of ascii tree visualizers.
 *
 * 1) printLevelOrder()
 *      - params: any valid binary tree & optional character to signify null values (defaults to 'x')
 *      - This will print the tree with the top-most row being the root row and every subsequent row below that.
 *
 * 2) printInOrder()
 *      - params: any valid tree root / node
 *      - This will print the tree horizontally and will only contain the values in the the tree (no null node representation)
 *
 */

// Examples
const Tree1 = new BST();
[7, 1, 3, 9, 8, 2, 12, 9, 5, 34, 100, 101, -1, -10, -15, -12, -5].map((num) => Tree1.add(num));

const Tree2 = new BT();
Tree2.buildFromArray([5, 1, 4, 1, null, null, 3]);

const BalancedTree = new BST();
BalancedTree.buildFromArray([3, 5, 6, 7, 8]);

printLevelOrder(Tree1);
printLevelOrder(Tree2);
printLevelOrder(BalancedTree);

printInOrder(Tree1.root);
printInOrder(Tree2.root);
printInOrder(BalancedTree.root);

function printLevelOrder(tree) {
  const levelArr = treeToLevelOrderArray(tree);
  let res = "";

  const totalLevels = Math.floor(Math.log2(levelArr.length));

  let currLevel = totalLevels;
  let prevLevelLength = -1;

  while (currLevel >= 0) {
    const values = levelArr.slice(Math.pow(2, currLevel) - 1, Math.pow(2, currLevel + 1) - 1);

    let spacing = " ".repeat(Math.pow(2, totalLevels - currLevel + 1));
    
    const level = values.join(spacing);

    const leftPad =
      prevLevelLength == -1 || prevLevelLength < level.length
        ? Math.pow(2, (totalLevels - currLevel) * 2)
        : prevLevelLength / 2 - level.length / 2;

    res = " ".repeat(leftPad) + level + "\n\n" + res;

    prevLevelLength = level.length + leftPad * 2;
    currLevel--;
  }

  console.log(res);
  return res;
}

function treeToLevelOrderArray(tree) {
  if (!tree.root) return [];

  const Q = [tree.root];
  const res = [];
  let consecutiveNulls = 0;

  while (true) {
    const node = Q.shift();

    if (node) {
      res.push(node.data);
      consecutiveNulls = 0;

      Q.push(node.left);
      Q.push(node.right);
    } else {
      res.push("x");
      consecutiveNulls += 1;

      Q.push(null);
      Q.push(null);
    }

    // BASE CASE: all nodes in a level are null
    // ie: If the number of consecutive nulls added to res is equal to the number of possible nodes in the level
    if (consecutiveNulls === Math.pow(2, Math.floor(Math.log2(res.length)))) {
      break;
    }
  }

  let lastNumIdx = 0;

  for (let i = res.length - 1; i >= 0; i--) {
    if (res[i] != "x") {
      lastNumIdx = i;
      break;
    }
  }
  // Cut off all trailing nulls
  return res.slice(0, lastNumIdx + 1);
}

function printInOrder(node, prefix = "", isLeft = true) {
  node.right && printInOrder(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  node.left && printInOrder(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
}
