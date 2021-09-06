const LinkedList = require("./implementation.js");

const list1 = new LinkedList();
const list2 = new LinkedList();

[2, 8, 5, 2].map((num) => list1.append(num));
[9, 5, 9, 8].map((num) => list2.append(num));

const sumLinkedLists = function (l1, l2) {
  const sumList = new LinkedList();

  l1.reverse();
  l2.reverse();

  let curr1 = l1.head;
  let curr2 = l2.head;

  let carry = 0;

  while (curr1 || curr2) {
    const num1 = curr1 ? curr1.data : 0;
    const num2 = curr2 ? curr2.data : 0;

    let sum = num1 + num2 + carry;

    if (sum > 9) {
      carry = 1;
      sumList.prepend(sum - 10);
    } else {
      carry = 0;
      sumList.prepend(sum);
    }

    curr1 = curr1 ? curr1.next : null;
    curr2 = curr2 ? curr2.next : null;
  }
  if (carry) sumList.prepend(carry);

  return sumList;
};

// list1 = [ 2, 8, 5, 2 ]
// list2 = [ 9, 5, 9, 8 ]
const sum = sumLinkedLists(list1, list2);
console.log(sum.toArray()); // [ 1, 2, 4, 5, 0 ]
