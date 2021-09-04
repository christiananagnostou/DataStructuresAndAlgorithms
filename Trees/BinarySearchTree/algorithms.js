// Given the root of a binary tree, determine if it is a valid binary search tree (BST).

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
