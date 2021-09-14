const BST = require("./BinarySearchTree/implementation");
const BT = require("./BinaryTree/implementation");

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}
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
[7, 1, 3, 9, 8, 2, 12, 9, 5, 34, 100, -1, -10, -15, -12, -5].map((num) => Tree1.add(num));

const Tree2 = new BT();
Tree2.buildFromArray([5, 1, 4, 1, null, null, 3]);

const BalancedTree = new BST();
BalancedTree.buildFromArray([3, 5, 6, 7, 8, 12, 4, 9]);

printLevelOrder(Tree1.root);
printInOrder(Tree1.root);

printLevelOrder(Tree2.root);
printInOrder(Tree2.root);

printLevelOrder(BalancedTree.root);
printInOrder(BalancedTree.root);

/**
 *
 * @param {Node} root
 *
 */
function printLevelOrder(root) {
  const levelArr = createLevelOrderArray(root);
  let res = "";

  const totalLevels = Math.floor(Math.log2(levelArr.length));

  // Start at the bottom level and work our way up
  let currLevel = totalLevels;
  let prevLevelLength = -1;

  while (currLevel >= 0) {
    // Values for the current level
    const values = levelArr.slice(Math.pow(2, currLevel) - 1, Math.pow(2, currLevel + 1) - 1);
    // Calculate the spacing between each value
    let spacing = " ".repeat(Math.pow(2, totalLevels - currLevel + 1));

    const level = values.join(spacing);

    // Calculate the amount of left padding required for current level based on the previous level
    const leftPad =
      prevLevelLength == -1
        ? Math.pow(2, (totalLevels - currLevel) * 2)
        : prevLevelLength / 2 - level.length / 2;

    // Assemble the level and place in front of the previous levels
    res = " ".repeat(leftPad) + level + "\n\n" + res;

    prevLevelLength = level.length + leftPad * 2;
    currLevel--;
  }

  console.log(res);
  return res;
}

/**
 *
 * @param {Node} root
 * @returns a level order array where all null values are filled in with '•'
 */
function createLevelOrderArray(root) {
  if (!root) return [];

  const Q = [root];
  const res = [];
  let consecutiveNulls = 0;
  let level = 0;

  while (true) {
    const node = Q.shift();

    if (node) {
      res.push(node.data);
      consecutiveNulls = 0;

      Q.push(node.left);
      Q.push(node.right);
    } else {
      res.push("•");
      consecutiveNulls += 1;

      Q.push(null);
      Q.push(null);
    }

    const newLevel = Math.floor(Math.log2(res.length));

    // If the level is changing and there are fewer consecutiveNulls added than the max for the row
    if (level !== newLevel && consecutiveNulls < Math.pow(2, newLevel)) {
      level = newLevel;
      consecutiveNulls = node && node.data ? 0 : 1;
    }
    // BASE CASE: all nodes in a level are null
    // ie: If the number of consecutiveNulls is equal to the number of possible nodes in the level
    else if (consecutiveNulls === Math.pow(2, level)) {
      break;
    }
  }

  // Cut off all trailing nulls
  return res.slice(0, -Math.pow(2, level));
}

/**
 *
 * @param {Node} node
 * @param {string} prefix
 * @param {boolean} isLeft
 */
function printInOrder(node, prefix = "", isLeft = true) {
  node.right && printInOrder(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`.substring(1));
  node.left && printInOrder(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
}
