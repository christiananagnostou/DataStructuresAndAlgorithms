const BST = require("./implementation");
const BT = require("../BinaryTree/implementation");

/**
 * PROMPT:
 * Given the root of a binary tree, determine if it is a valid binary search tree (BST).
 * A valid BST is defined as follows:
 *      - The left subtree of a node contains only nodes with keys less than the node's key.
 *      - The right subtree of a node contains only nodes with keys greater than the node's key.
 *      - Both the left and right subtrees must also be binary search trees.
 *
 * @param {BT | BST} root
 * @return {boolean}
 */
const isValidBST = function (root) {
  const checkNode = function (node, min = null, max = null) {
    if (!node) return true;

    if ((min != null && node.val <= min) || (max != null && node.val >= max)) {
      return false;
    }

    return checkNode(node.left, min, node.val) && checkNode(node.right, node.val, max);
  };

  return checkNode(root);
};
// const validBST = new BST();
// [2, 1, 3].map((num) => validBST.add(num));
// console.log(isValidBST(validBST));

// const invalidBST = new BT();
// invalidBST.buildFromArray([5, 1, 4, null, null, 3, 6]);
// console.log(isValidBST(invalidBST));

/**
 * PROMPT:
 * Given the root of a binary tree, return its maximum depth.
 * A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
 *
 * @param {BST | BT} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (!root) return 0;

  const findMaxDepth = function (node) {
    if (!node) return 0;

    const left = findMaxDepth(node.left);
    const right = findMaxDepth(node.right);

    return Math.max(left + 1, right + 1);
  };

  return findMaxDepth(root);
};

/**
 * You have a binary tree t. Your task is to find the largest value in each row of this tree.
 *
 * @param {BT} t
 * @returns
 */
function largestValuesInTreeRows(t) {
  if (!t) return [];

  const res = [];

  function getDepth(node, d = 0) {
    if (!node) return -1;

    getDepth(node.left, d + 1);
    getDepth(node.right, d + 1);

    if (!res[d] || res[d] < node.value) {
      res[d] = node.value;
    }
  }
  getDepth(t);

  return res;
}
