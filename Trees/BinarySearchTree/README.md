# Binary Search Tree

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
