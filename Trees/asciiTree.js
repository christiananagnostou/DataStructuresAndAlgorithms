const BST = require("./BinarySearchTree/implementation");
const BT = require("./BinaryTree/implementation");

const Tree1 = new BST();
[7, 1, 3, 9, 8, 2, 12, 9, 5, 34, 100, 101].map((num) => Tree1.add(num));

const Tree2 = new BT();
Tree2.buildFromArray([5, 1, 4, 1, null, null, 3]);

generate(Tree1);
generate(Tree2);

function generate(tree) {
  const levelArr = treeToArray(tree);
  let res = "";

  const totalLevels = Math.floor(Math.log2(levelArr.length));

  let currLevel = totalLevels;
  let prevLevelLength = -1;

  while (currLevel >= 0) {
    const values = levelArr.slice(Math.pow(2, currLevel) - 1, Math.pow(2, currLevel + 1) - 1);

    let spacing = " ".repeat(Math.pow(2, totalLevels - currLevel + 1));
    const level = values.join(spacing);

    const leftPad = prevLevelLength == -1 ? 0 : prevLevelLength / 2 - level.length / 2;
    res = " ".repeat(leftPad) + level + "\n\n" + res;

    prevLevelLength = level.length + leftPad * 2;
    currLevel--;
  }

  console.log(res);
  return res;
}

function treeToArray(tree) {
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
