// Initial data extracted from the dataset
// This contains the Striver's A2Z DSA Sheet questions

const initialQuestions = [
    {
        "_id": "q1",
        "topic": "Learn the basics",
        "subTopic": "Things to Know in C++/Java/Python or any language",
        "title": "User Input / Output",
        "resource": "https://youtu.be/EAR7De6Goz4?t=250",
        "questionId": {
            "name": "Search Query Auto Complete",
            "difficulty": "Hard",
            "platform": "geeksforgeeks",
            "problemUrl": "https://www.geeksforgeeks.org/problems/search-query-auto-complete/1"
        }
    },
    {
        "_id": "q2",
        "topic": "Learn the basics",
        "subTopic": "Things to Know in C++/Java/Python or any language",
        "title": "Data Types",
        "resource": "https://youtu.be/EAR7De6Goz4?t=755",
        "questionId": {
            "name": "Data Type",
            "difficulty": "Basic",
            "platform": "geeksforgeeks",
            "problemUrl": "https://www.geeksforgeeks.org/problems/data-type-1666706751/1"
        }
    },
    {
        "_id": "q3",
        "topic": "Learn the basics",
        "subTopic": "Things to Know in C++/Java/Python or any language",
        "title": "If Else statements",
        "resource": "https://youtu.be/EAR7De6Goz4?t=1259",
        "questionId": {
            "name": "Decision Making in Java",
            "difficulty": "Basic",
            "platform": "geeksforgeeks",
            "problemUrl": "https://www.geeksforgeeks.org/problems/java-if-else-decision-making0924/1"
        }
    },
    {
        "_id": "q4",
        "topic": "Learn the basics",
        "subTopic": "Things to Know in C++/Java/Python or any language",
        "title": "Switch Statement",
        "resource": "https://youtu.be/EAR7De6Goz4",
        "questionId": {
            "name": "Java Switch Case statement",
            "difficulty": "Basic",
            "platform": "geeksforgeeks",
            "problemUrl": "https://www.geeksforgeeks.org/problems/java-switch-case-statement3529/1"
        }
    },
    {
        "_id": "q5",
        "topic": "Learn the basics",
        "subTopic": "Things to Know in C++/Java/Python or any language",
        "title": "For loops",
        "resource": "https://youtu.be/EAR7De6Goz4?t=3096",
        "questionId": {
            "name": "Nth Fibonacci Number",
            "difficulty": "Easy",
            "platform": "codestudio",
            "problemUrl": "https://www.naukri.com/code360/problems/nth-fibonacci-number_74156"
        }
    },
    {
        "_id": "q6",
        "topic": "Learn the basics",
        "subTopic": "Things to Know in C++/Java/Python or any language",
        "title": "While loops",
        "resource": "https://youtu.be/EAR7De6Goz4?t=3459",
        "questionId": {
            "name": "While loop- printTable - Java",
            "difficulty": "Easy",
            "platform": "geeksforgeeks",
            "problemUrl": "https://www.geeksforgeeks.org/problems/while-loop-printtable-java/1"
        }
    },
    {
        "_id": "q7",
        "topic": "Learn the basics",
        "subTopic": "Things to Know in C++/Java/Python or any language",
        "title": "Functions (Pass by Reference and Value)",
        "resource": "https://youtu.be/EAR7De6Goz4?t=3677",
        "questionId": {
            "name": "Pass by Reference and Value",
            "difficulty": "Easy",
            "platform": "geeksforgeeks",
            "problemUrl": "https://www.geeksforgeeks.org/problems/pass-by-reference-and-value/1"
        }
    },
    {
        "_id": "q8",
        "topic": "Learn the basics",
        "subTopic": "Know Basic Maths",
        "title": "Count Digits",
        "resource": "https://youtu.be/1xNbjMdbjug",
        "questionId": {
            "name": "Count Digits",
            "difficulty": "Easy",
            "platform": "geeksforgeeks",
            "problemUrl": "https://www.geeksforgeeks.org/problems/count-digits5716/1"
        }
    },
    {
        "_id": "q9",
        "topic": "Learn the basics",
        "subTopic": "Know Basic Maths",
        "title": "Reverse a Number",
        "resource": "https://youtu.be/1xNbjMdbjug?t=930",
        "questionId": {
            "name": "Reverse Integer",
            "difficulty": "Medium",
            "platform": "leetcode",
            "problemUrl": "https://leetcode.com/problems/reverse-integer"
        }
    },
    {
        "_id": "q10",
        "topic": "Arrays",
        "subTopic": null,
        "title": "Set Matrix Zeros",
        "resource": "https://youtu.be/N0MgLvceX7M",
        "questionId": {
            "name": "Set Matrix Zeroes",
            "difficulty": "Medium",
            "platform": "leetcode",
            "problemUrl": "https://leetcode.com/problems/set-matrix-zeroes"
        }
    },
    {
        "_id": "q11",
        "topic": "Arrays",
        "subTopic": null,
        "title": "Pascal's Triangle",
        "resource": "https://youtu.be/bR7mQgwQ_o8",
        "questionId": {
            "name": "Pascal's Triangle",
            "difficulty": "Easy",
            "platform": "leetcode",
            "problemUrl": "https://leetcode.com/problems/pascals-triangle"
        }
    },
    {
        "_id": "q12",
        "topic": "Arrays",
        "subTopic": null,
        "title": "Next Permutation",
        "resource": "https://youtu.be/JDOXKqF60RQ",
        "questionId": {
            "name": "Next Permutation",
            "difficulty": "Medium",
            "platform": "leetcode",
            "problemUrl": "https://leetcode.com/problems/next-permutation"
        }
    },
    {
        "_id": "q13",
        "topic": "Arrays",
        "subTopic": null,
        "title": "Kadane's Algorithm",
        "resource": "https://youtu.be/AHZpyENo7k4",
        "questionId": {
            "name": "Maximum Subarray",
            "difficulty": "Medium",
            "platform": "leetcode",
            "problemUrl": "https://leetcode.com/problems/maximum-subarray"
        }
    },
    {
        "_id": "q14",
        "topic": "Arrays",
        "subTopic": null,
        "title": "Sort Colors (Dutch National Flag)",
        "resource": "https://www.youtube.com/watch?v=tp8JIuCXBaU",
        "questionId": {
            "name": "Sort Colors",
            "difficulty": "Medium",
            "platform": "leetcode",
            "problemUrl": "https://leetcode.com/problems/sort-colors"
        }
    },
    {
        "_id": "q15",
        "topic": "Arrays",
        "subTopic": null,
        "title": "Stock Buy and Sell",
        "resource": "https://youtu.be/excAOvwF_Wk",
        "questionId": {
            "name": "Best Time to Buy and Sell Stock",
            "difficulty": "Easy",
            "platform": "leetcode",
            "problemUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock"
        }
    },
    {
        "_id": "q16",
        "topic": "Binary Search",
        "subTopic": null,
        "title": "Binary Search",
        "resource": "https://youtu.be/MHf6awe89xw",
        "questionId": {
            "name": "Binary Search",
            "difficulty": "Easy",
            "platform": "leetcode",
            "problemUrl": "https://leetcode.com/problems/binary-search"
        }
    },
    {
        "_id": "q17",
        "topic": "Binary Search",
        "subTopic": null,
        "title": "Search in Rotated Sorted Array",
        "resource": "https://youtu.be/r3pMQ8-Ad5s",
        "questionId": {
            "name": "Search in Rotated Sorted Array",
            "difficulty": "Medium",
            "platform": "leetcode",
            "problemUrl": "https://leetcode.com/problems/search-in-rotated-sorted-array"
        }
    },
    {
        "_id": "q18",
        "topic": "Binary Search",
        "subTopic": null,
        "title": "Median of Two Sorted Arrays",
        "resource": "https://youtu.be/C2rRzz-JDk8",
        "questionId": {
            "name": "Median of Two Sorted Arrays",
            "difficulty": "Hard",
            "platform": "leetcode",
            "problemUrl": "https://leetcode.com/problems/median-of-two-sorted-arrays"
        }
    },
    {
        "_id": "q19",
        "topic": "Linked List",
        "subTopic": null,
        "title": "Reverse a LinkedList",
        "resource": "https://youtu.be/iRtLEoL-r-g",
        "questionId": {
            "name": "Reverse Linked List",
            "difficulty": "Easy",
            "platform": "leetcode",
            "problemUrl": "https://leetcode.com/problems/reverse-linked-list"
        }
    },
    {
        "_id": "q20",
        "topic": "Linked List",
        "subTopic": null,
        "title": "Find Middle of LinkedList",
        "resource": "https://youtu.be/sGdwSH8RK-o",
        "questionId": {
            "name": "Middle of the Linked List",
            "difficulty": "Easy",
            "platform": "leetcode",
            "problemUrl": "https://leetcode.com/problems/middle-of-the-linked-list"
        }
    },
    {
        "_id": "q21",
        "topic": "Linked List",
        "subTopic": null,
        "title": "Merge Two Sorted Lists",
        "resource": "https://youtu.be/Xb4slcp1U38",
        "questionId": {
            "name": "Merge Two Sorted Lists",
            "difficulty": "Easy",
            "platform": "leetcode",
            "problemUrl": "https://leetcode.com/problems/merge-two-sorted-lists"
        }
    },
    {
        "_id": "q22",
        "topic": "Stack and Queue",
        "subTopic": null,
        "title": "Valid Parentheses",
        "resource": "https://youtu.be/xwjS0iZhw4I",
        "questionId": {
            "name": "Valid Parentheses",
            "difficulty": "Easy",
            "platform": "leetcode",
            "problemUrl": "https://leetcode.com/problems/valid-parentheses"
        }
    },
    {
        "_id": "q23",
        "topic": "Stack and Queue",
        "subTopic": null,
        "title": "Next Greater Element",
        "resource": "https://youtu.be/e7XQLtOQM3I",
        "questionId": {
            "name": "Next Greater Element I",
            "difficulty": "Easy",
            "platform": "leetcode",
            "problemUrl": "https://leetcode.com/problems/next-greater-element-i"
        }
    },
    {
        "_id": "q24",
        "topic": "Stack and Queue",
        "subTopic": null,
        "title": "LRU Cache",
        "resource": "https://youtu.be/z9bJUPxzFOw",
        "questionId": {
            "name": "LRU Cache",
            "difficulty": "Medium",
            "platform": "leetcode",
            "problemUrl": "https://leetcode.com/problems/lru-cache"
        }
    },
    {
        "_id": "q25",
        "topic": "Binary Tree",
        "subTopic": "Tree Traversal",
        "title": "Inorder Traversal",
        "resource": "https://youtu.be/Z_NEgBgbRVI",
        "questionId": {
            "name": "Binary Tree Inorder Traversal",
            "difficulty": "Easy",
            "platform": "leetcode",
            "problemUrl": "https://leetcode.com/problems/binary-tree-inorder-traversal"
        }
    },
    {
        "_id": "q26",
        "topic": "Binary Tree",
        "subTopic": "Tree Traversal",
        "title": "Preorder Traversal",
        "resource": "https://youtu.be/RlUu72JrOCQ",
        "questionId": {
            "name": "Binary Tree Preorder Traversal",
            "difficulty": "Easy",
            "platform": "leetcode",
            "problemUrl": "https://leetcode.com/problems/binary-tree-preorder-traversal"
        }
    },
    {
        "_id": "q27",
        "topic": "Binary Tree",
        "subTopic": "Tree Traversal",
        "title": "Postorder Traversal",
        "resource": "https://youtu.be/COQOU6klsBg",
        "questionId": {
            "name": "Binary Tree Postorder Traversal",
            "difficulty": "Easy",
            "platform": "leetcode",
            "problemUrl": "https://leetcode.com/problems/binary-tree-postorder-traversal"
        }
    },
    {
        "_id": "q28",
        "topic": "Binary Tree",
        "subTopic": "Tree Properties",
        "title": "Maximum Depth of Binary Tree",
        "resource": "https://youtu.be/eD3tmO66aBA",
        "questionId": {
            "name": "Maximum Depth of Binary Tree",
            "difficulty": "Easy",
            "platform": "leetcode",
            "problemUrl": "https://leetcode.com/problems/maximum-depth-of-binary-tree"
        }
    },
    {
        "_id": "q29",
        "topic": "Binary Tree",
        "subTopic": "Tree Properties",
        "title": "Balanced Binary Tree",
        "resource": "https://youtu.be/Yt50Jfbd8Po",
        "questionId": {
            "name": "Balanced Binary Tree",
            "difficulty": "Easy",
            "platform": "leetcode",
            "problemUrl": "https://leetcode.com/problems/balanced-binary-tree"
        }
    },
    {
        "_id": "q30",
        "topic": "Dynamic Programming",
        "subTopic": "1D DP",
        "title": "Climbing Stairs",
        "resource": "https://youtu.be/mLfjzJsN8us",
        "questionId": {
            "name": "Climbing Stairs",
            "difficulty": "Easy",
            "platform": "leetcode",
            "problemUrl": "https://leetcode.com/problems/climbing-stairs"
        }
    },
    {
        "_id": "q31",
        "topic": "Dynamic Programming",
        "subTopic": "1D DP",
        "title": "House Robber",
        "resource": "https://youtu.be/GrMBfJNk_NY",
        "questionId": {
            "name": "House Robber",
            "difficulty": "Medium",
            "platform": "leetcode",
            "problemUrl": "https://leetcode.com/problems/house-robber"
        }
    },
    {
        "_id": "q32",
        "topic": "Dynamic Programming",
        "subTopic": "2D DP",
        "title": "Unique Paths",
        "resource": "https://youtu.be/t_f0nwwdg5o",
        "questionId": {
            "name": "Unique Paths",
            "difficulty": "Medium",
            "platform": "leetcode",
            "problemUrl": "https://leetcode.com/problems/unique-paths"
        }
    },
    {
        "_id": "q33",
        "topic": "Graph",
        "subTopic": "BFS/DFS",
        "title": "Number of Islands",
        "resource": "https://youtu.be/pV2kpPD66nE",
        "questionId": {
            "name": "Number of Islands",
            "difficulty": "Medium",
            "platform": "leetcode",
            "problemUrl": "https://leetcode.com/problems/number-of-islands"
        }
    },
    {
        "_id": "q34",
        "topic": "Graph",
        "subTopic": "BFS/DFS",
        "title": "Rotting Oranges",
        "resource": "https://youtu.be/yf3oUhkvqA0",
        "questionId": {
            "name": "Rotting Oranges",
            "difficulty": "Medium",
            "platform": "leetcode",
            "problemUrl": "https://leetcode.com/problems/rotting-oranges"
        }
    },
    {
        "_id": "q35",
        "topic": "Recursion",
        "subTopic": null,
        "title": "Subset Sum",
        "resource": "https://youtu.be/rYkfBRtMJr8",
        "questionId": {
            "name": "Subset Sum Problem",
            "difficulty": "Medium",
            "platform": "geeksforgeeks",
            "problemUrl": "https://www.geeksforgeeks.org/problems/subset-sum-problem-1611555638/1"
        }
    },
    {
        "_id": "q36",
        "topic": "Recursion",
        "subTopic": null,
        "title": "Combination Sum",
        "resource": "https://youtu.be/OyZFFqQtu98",
        "questionId": {
            "name": "Combination Sum",
            "difficulty": "Medium",
            "platform": "leetcode",
            "problemUrl": "https://leetcode.com/problems/combination-sum"
        }
    }
]

export default initialQuestions
