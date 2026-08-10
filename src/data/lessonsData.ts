import { LessonContent } from '../types';

export const LESSONS_DATA: Record<string, LessonContent> = {
  cpp_basics: {
    topicId: 'cpp_basics',
    title: 'C++ Basics',
    level: 'LEVEL 1 — C++ FOUNDATIONS',
    whatIsIt: 'C++ is a fast, powerful programming language used to build operating systems, high-performance games, and data structures. Every C++ program starts executing inside a special place called the main() function.',
    realLifeExample: {
      analogy: 'A cooking recipe with step-by-step instructions.',
      details: 'Think of C++ code like a kitchen recipe. The main() function is the master chef instruction sheet that tells the computer: first prepare variables, do calculations step 1 to step 10, and then finish by serving the result.',
    },
    cppCode: `#include <iostream>
using namespace std;

int main() {
    // Print a friendly greeting
    cout << "Welcome to DSA Quest!" << endl;
    
    int age = 18;
    cout << "Your coder age is: " << age << endl;
    
    return 0;
}`,
    codeLines: [
      { lineNum: 1, code: '#include <iostream>', explanation: 'Includes the C++ standard library that allows us to read input and print output.' },
      { lineNum: 2, code: 'using namespace std;', explanation: 'Allows us to use names like cout and endl without typing std:: every single time.' },
      { lineNum: 4, code: 'int main() {', explanation: 'The starting point of every C++ program. Execution begins here.' },
      { lineNum: 6, code: 'cout << "Welcome to DSA Quest!" << endl;', explanation: 'cout means "character output". It displays text on the screen.' },
      { lineNum: 8, code: 'int age = 18;', explanation: 'Declares an integer variable named "age" and stores the value 18 in memory.' },
      { lineNum: 9, code: 'cout << "Your coder age is: " << age << endl;', explanation: 'Prints text along with the value of the age variable.' },
      { lineNum: 11, code: 'return 0;', explanation: 'Tells the operating system that our program finished successfully without any errors.' },
    ],
    expectedOutput: `Welcome to DSA Quest!
Your coder age is: 18`,
    visualizationType: 'array',
    miniGameId: 'debugger',
    miniGameTitle: 'C++ Bug Hunter Game',
  },

  time_complexity: {
    topicId: 'time_complexity',
    title: 'Time Complexity & Big O',
    level: 'LEVEL 2 — DSA FOUNDATIONS',
    whatIsIt: 'Time complexity is not measuring seconds on a stopwatch (because laptops run at different speeds). Instead, time complexity counts how many execution steps an algorithm takes as the input size (N) grows huge!',
    realLifeExample: {
      analogy: 'Searching for a name in a physical phonebook.',
      details: 'If you check page by page from start to end, searching 1,000 pages takes 1,000 checks (Linear Time - O(N)). But if you open in the middle and flip left/right repeatedly, it takes only 10 flips (Logarithmic Time - O(log N))!',
    },
    cppCode: `#include <iostream>
using namespace std;

void linearExample(int N) {
    int operations = 0;
    for(int i = 0; i < N; i++) {
        operations++;
    }
    cout << "Input size N = " << N << " -> Operations = " << operations << " (O(N))" << endl;
}

int main() {
    linearExample(10);
    linearExample(100);
    return 0;
}`,
    codeLines: [
      { lineNum: 4, code: 'void linearExample(int N) {', explanation: 'A helper function that simulates a loop running N times.' },
      { lineNum: 6, code: 'for(int i = 0; i < N; i++) {', explanation: 'This loop executes exactly N times. As N doubles, the work doubles.' },
      { lineNum: 7, code: 'operations++;', explanation: 'Increments our operation counter by 1 in each step.' },
      { lineNum: 9, code: 'cout << "Input size N = " ...', explanation: 'Outputs the direct relation between input size N and work done.' },
    ],
    expectedOutput: `Input size N = 10 -> Operations = 10 (O(N))
Input size N = 100 -> Operations = 100 (O(N))`,
    visualizationType: 'complexity',
    miniGameId: 'complexity',
    miniGameTitle: 'Big-O Growth Simulator',
  },

  arrays: {
    topicId: 'arrays',
    title: 'Arrays in C++',
    level: 'LEVEL 3 — ARRAYS & STRINGS',
    whatIsIt: 'An array is a collection of elements of the SAME data type stored right next to each other in contiguous memory slots. You access elements using 0-based indices like arr[0], arr[1], arr[2].',
    realLifeExample: {
      analogy: 'A row of numbered gym lockers.',
      details: 'Imagine locker #0, locker #1, locker #2 side-by-side. If you know the locker number (index), you can open it instantly in O(1) constant time!',
    },
    cppCode: `#include <iostream>
using namespace std;

int main() {
    // Declare an array of 5 integers
    int arr[5] = {10, 20, 30, 40, 50};
    
    // Access individual elements
    cout << "First element (index 0): " << arr[0] << endl;
    cout << "Third element (index 2): " << arr[2] << endl;
    
    // Modify an element
    arr[1] = 25;
    cout << "Updated index 1: " << arr[1] << endl;
    
    return 0;
}`,
    codeLines: [
      { lineNum: 5, code: 'int arr[5] = {10, 20, 30, 40, 50};', explanation: 'Creates 5 contiguous integer memory slots initialized with numbers 10, 20, 30, 40, 50.' },
      { lineNum: 8, code: 'cout << "First element (index 0): " << arr[0];', explanation: '0-based indexing! The very first item is at index 0.' },
      { lineNum: 12, code: 'arr[1] = 25;', explanation: 'Overwrites the value at index 1 from 20 to 25.' },
    ],
    expectedOutput: `First element (index 0): 10
Third element (index 2): 30
Updated index 1: 25`,
    visualizationType: 'array',
    miniGameId: 'array_sort',
    miniGameTitle: 'Array Reordering Game',
  },

  linear_search: {
    topicId: 'linear_search',
    title: 'Linear Search',
    level: 'LEVEL 4 — SEARCHING & SORTING',
    whatIsIt: 'Linear search looks for a target value by checking every single element in an array one by one from left to right until either the target is found or the end of the array is reached.',
    realLifeExample: {
      analogy: 'Looking for a specific key on a key ring.',
      details: 'You test key #1, then key #2, then key #3 until one unlocks the door. If you have 10 keys, worst case you try all 10.',
    },
    cppCode: `#include <iostream>
using namespace std;

int linearSearch(int arr[], int size, int target) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == target) {
            return i; // Target found at index i!
        }
    }
    return -1; // Target not found
}

int main() {
    int numbers[] = {14, 28, 42, 56, 70};
    int target = 42;
    int index = linearSearch(numbers, 5, target);
    cout << "Found target " << target << " at index: " << index << endl;
    return 0;
}`,
    codeLines: [
      { lineNum: 4, code: 'int linearSearch(int arr[], int size, int target) {', explanation: 'Function taking array pointer, array size, and search target.' },
      { lineNum: 5, code: 'for (int i = 0; i < size; i++) {', explanation: 'Loops from index 0 to size - 1 sequentially.' },
      { lineNum: 6, code: 'if (arr[i] == target) { return i; }', explanation: 'If current element matches target, immediately return index i.' },
      { lineNum: 10, code: 'return -1;', explanation: 'If loop finishes without match, return -1 to signify "not found".' },
    ],
    expectedOutput: `Found target 42 at index: 2`,
    visualizationType: 'array',
    miniGameId: 'array_sort',
    miniGameTitle: 'Linear Search Challenge',
  },

  binary_search: {
    topicId: 'binary_search',
    title: 'Binary Search',
    level: 'LEVEL 4 — SEARCHING & SORTING',
    whatIsIt: 'Binary Search is a blazing fast search algorithm that works ONLY on SORTED arrays. It repeatedly cuts the search space in half by comparing the target with the middle element (mid). Time complexity: O(log N)!',
    realLifeExample: {
      analogy: 'Guessing a number between 1 and 100 with "Higher / Lower" hints.',
      details: 'Guess 50 first! If told "Higher", you instantly eliminate 1 to 50! Next guess 75, cutting the remaining half in half again!',
    },
    cppCode: `#include <iostream>
using namespace std;

int binarySearch(int arr[], int size, int target) {
    int low = 0;
    int high = size - 1;
    
    while (low <= high) {
        int mid = low + (high - low) / 2;
        
        if (arr[mid] == target) return mid; // Found!
        if (arr[mid] < target) low = mid + 1; // Target is in right half
        else high = mid - 1; // Target is in left half
    }
    return -1;
}

int main() {
    int sortedArr[] = {10, 20, 30, 42, 50, 60, 70, 80};
    int result = binarySearch(sortedArr, 8, 42);
    cout << "Binary Search found 42 at index: " << result << endl;
    return 0;
}`,
    codeLines: [
      { lineNum: 5, code: 'int low = 0; int high = size - 1;', explanation: 'Initializes pointers to cover the entire array bounds.' },
      { lineNum: 7, code: 'while (low <= high) {', explanation: 'Keeps searching as long as search space has valid elements.' },
      { lineNum: 8, code: 'int mid = low + (high - low) / 2;', explanation: 'Calculates middle index safely avoiding integer overflow.' },
      { lineNum: 10, code: 'if (arr[mid] == target) return mid;', explanation: 'Target matches middle element! Search complete.' },
      { lineNum: 11, code: 'if (arr[mid] < target) low = mid + 1;', explanation: 'Target is larger, so discard left half by moving low pointer.' },
    ],
    expectedOutput: `Binary Search found 42 at index: 3`,
    visualizationType: 'binary_search',
    miniGameId: 'binary_search',
    miniGameTitle: 'Binary Search Target Hunter',
  },

  bubble_sort: {
    topicId: 'bubble_sort',
    title: 'Bubble Sort',
    level: 'LEVEL 4 — SEARCHING & SORTING',
    whatIsIt: 'Bubble Sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order. Larger elements "bubble up" to the end of the array after every pass. Time complexity: O(N²).',
    realLifeExample: {
      analogy: 'Bubbles rising in a soda glass.',
      details: 'Light, larger bubbles rise upwards to the top surface pass after pass until all bubbles settle in order.',
    },
    cppCode: `#include <iostream>
using namespace std;

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap adjacent items
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22};
    bubbleSort(arr, 5);
    cout << "Sorted array: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    return 0;
}`,
    codeLines: [
      { lineNum: 5, code: 'for (int i = 0; i < n - 1; i++) {', explanation: 'Outer loop runs n-1 passes over the array.' },
      { lineNum: 6, code: 'for (int j = 0; j < n - i - 1; j++) {', explanation: 'Inner loop compares adjacent pairs (j and j+1).' },
      { lineNum: 7, code: 'if (arr[j] > arr[j + 1]) {', explanation: 'Checks if left item is greater than right item.' },
      { lineNum: 9, code: 'swap(arr[j], arr[j + 1]);', explanation: 'Swaps out-of-order adjacent elements.' },
    ],
    expectedOutput: `Sorted array: 12 22 25 34 64`,
    visualizationType: 'sorting',
    miniGameId: 'array_sort',
    miniGameTitle: 'Bubble Swap Game',
  },

  singly_linked_list: {
    topicId: 'singly_linked_list',
    title: 'Singly Linked List',
    level: 'LEVEL 5 — LINKED LIST',
    whatIsIt: 'Unlike arrays where items sit side-by-side in fixed memory, a Linked List consists of separate Node objects scattered anywhere in memory. Each Node holds data AND a pointer (next) referencing the next Node address!',
    realLifeExample: {
      analogy: 'A treasure hunt with clue cards.',
      details: 'Clue #1 gives a secret hint AND the address location of Clue #2. Clue #2 gives its data AND points to Clue #3 until the final clue points to NULL!',
    },
    cppCode: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

int main() {
    // Create nodes
    Node* head = new Node(10);
    head->next = new Node(20);
    head->next->next = new Node(30);
    
    // Traverse linked list
    Node* temp = head;
    while (temp != nullptr) {
        cout << "[" << temp->data << "] -> ";
        temp = temp->next;
    }
    cout << "NULL" << endl;
    return 0;
}`,
    codeLines: [
      { lineNum: 4, code: 'struct Node { int data; Node* next; };', explanation: 'Defines a Node structure containing integer data and a pointer to the next Node.' },
      { lineNum: 11, code: 'Node* head = new Node(10);', explanation: 'Allocates dynamic memory for the head node storing 10.' },
      { lineNum: 12, code: 'head->next = new Node(20);', explanation: 'Connects head node next pointer to a new node storing 20.' },
      { lineNum: 17, code: 'while (temp != nullptr) {', explanation: 'Traverses through the chain of nodes until reaching nullptr (end of list).' },
    ],
    expectedOutput: `[10] -> [20] -> [30] -> NULL`,
    visualizationType: 'linked_list',
    miniGameId: 'linked_list',
    miniGameTitle: 'Node Connection Quest',
  },

  stack: {
    topicId: 'stack',
    title: 'Stack (LIFO)',
    level: 'LEVEL 6 — STACK & QUEUE',
    whatIsIt: 'A Stack is a linear data structure that follows LIFO (Last In, First Out). The last element pushed onto the stack is the very first element popped out. Main operations: push(x), pop(), peek() / top().',
    realLifeExample: {
      analogy: 'A stack of dinner plates at a buffet.',
      details: 'You put new plates on TOP of the stack. When someone takes a plate, they pull from the TOP! You cannot remove the bottom plate without removing top plates first.',
    },
    cppCode: `#include <iostream>
#include <stack>
using namespace std;

int main() {
    stack<int> s;
    
    // Push elements
    s.push(10);
    s.push(20);
    s.push(30);
    
    cout << "Top element: " << s.top() << endl; // 30
    
    // Pop top element
    s.pop();
    cout << "After pop, new top: " << s.top() << endl; // 20
    
    return 0;
}`,
    codeLines: [
      { lineNum: 6, code: 'stack<int> s;', explanation: 'Declares an empty C++ STL stack of integers.' },
      { lineNum: 9, code: 's.push(10); s.push(20); s.push(30);', explanation: 'Pushes 10, then 20, then 30 on top of the stack.' },
      { lineNum: 12, code: 'cout << "Top element: " << s.top();', explanation: 's.top() inspects the topmost element (30) without removing it.' },
      { lineNum: 15, code: 's.pop();', explanation: 'Removes the topmost element (30) from the stack.' },
    ],
    expectedOutput: `Top element: 30
After pop, new top: 20`,
    visualizationType: 'stack',
    miniGameId: 'stack',
    miniGameTitle: 'Plate Stacker Game',
  },

  queue: {
    topicId: 'queue',
    title: 'Queue (FIFO)',
    level: 'LEVEL 6 — STACK & QUEUE',
    whatIsIt: 'A Queue is a linear structure that follows FIFO (First In, First Out). Elements enter at the REAR (enqueue) and exit from the FRONT (dequeue).',
    realLifeExample: {
      analogy: 'A line of people waiting at a movie ticket counter.',
      details: 'The person who stands in line first gets served and buys their ticket first! New arrivals line up at the back of the queue.',
    },
    cppCode: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    
    // Enqueue items at rear
    q.push(100);
    q.push(200);
    q.push(300);
    
    cout << "Front item: " << q.front() << endl; // 100
    
    // Dequeue item from front
    q.pop();
    cout << "After dequeue, new front: " << q.front() << endl; // 200
    
    return 0;
}`,
    codeLines: [
      { lineNum: 6, code: 'queue<int> q;', explanation: 'Declares an empty C++ STL queue of integers.' },
      { lineNum: 9, code: 'q.push(100); q.push(200);', explanation: 'Enqueues elements at the rear of the queue.' },
      { lineNum: 12, code: 'q.front();', explanation: 'Returns the oldest element standing at the front of the queue.' },
      { lineNum: 15, code: 'q.pop();', explanation: 'Removes the front element from the queue.' },
    ],
    expectedOutput: `Front item: 100
After dequeue, new front: 200`,
    visualizationType: 'queue',
    miniGameId: 'queue',
    miniGameTitle: 'Ticket Line Manager',
  },

  intro_recursion: {
    topicId: 'intro_recursion',
    title: 'Introduction to Recursion',
    level: 'LEVEL 7 — RECURSION',
    whatIsIt: 'Recursion is a programming technique where a function calls ITSELF to solve smaller instances of the same problem. Every recursive function MUST have a BASE CASE to stop calling itself and prevent infinite loops!',
    realLifeExample: {
      analogy: 'Matryoshka Russian nesting dolls.',
      details: 'You open a big doll to find a medium doll, open medium to find small doll, until you reach the tiny solid doll (the base case) that cannot be opened anymore!',
    },
    cppCode: `#include <iostream>
using namespace std;

int factorial(int n) {
    // Base case: 0! = 1 and 1! = 1
    if (n <= 1) return 1;
    
    // Recursive call: n * factorial(n - 1)
    return n * factorial(n - 1);
}

int main() {
    int num = 5;
    cout << "Factorial of " << num << " is: " << factorial(num) << endl;
    return 0;
}`,
    codeLines: [
      { lineNum: 5, code: 'if (n <= 1) return 1;', explanation: 'CRITICAL BASE CASE! Stops recursion when n reaches 1 or 0.' },
      { lineNum: 8, code: 'return n * factorial(n - 1);', explanation: 'Recursive step! Computes n multiplied by factorial of (n - 1).' },
    ],
    expectedOutput: `Factorial of 5 is: 120`,
    visualizationType: 'recursion',
    miniGameId: 'recursion',
    miniGameTitle: 'Recursion Call Stack Game',
  },

  binary_tree: {
    topicId: 'binary_tree',
    title: 'Binary Trees & Traversals',
    level: 'LEVEL 8 — TREES',
    whatIsIt: 'A Binary Tree is a hierarchical non-linear data structure where each parent node has AT MOST two children (left child and right child). Inorder traversal visits: Left subtree -> Root -> Right subtree.',
    realLifeExample: {
      analogy: 'A family genealogy tree or sports tournament bracket.',
      details: 'The championship match is the Root, semi-finals are left/right children, quarter-finals are grandchildren leaves!',
    },
    cppCode: `#include <iostream>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

void inorder(TreeNode* root) {
    if (root == nullptr) return;
    inorder(root->left);       // Left
    cout << root->val << " ";  // Root
    inorder(root->right);      // Right
}

int main() {
    TreeNode* root = new TreeNode(10);
    root->left = new TreeNode(5);
    root->right = new TreeNode(15);
    
    cout << "Inorder traversal: ";
    inorder(root);
    cout << endl;
    return 0;
}`,
    codeLines: [
      { lineNum: 4, code: 'struct TreeNode { int val; TreeNode* left; TreeNode* right; };', explanation: 'TreeNode structure with value and left/right pointers.' },
      { lineNum: 11, code: 'void inorder(TreeNode* root) {', explanation: 'Inorder traversal function using recursion.' },
      { lineNum: 13, code: 'inorder(root->left);', explanation: 'Visits left child first.' },
      { lineNum: 14, code: 'cout << root->val << " ";', explanation: 'Visits current root node.' },
      { lineNum: 15, code: 'inorder(root->right);', explanation: 'Visits right child last.' },
    ],
    expectedOutput: `Inorder traversal: 5 10 15`,
    visualizationType: 'tree',
    miniGameId: 'tree',
    miniGameTitle: 'Tree Traversal Quest',
  },

  graph_basics: {
    topicId: 'graph_basics',
    title: 'Graph Basics & Traversal',
    level: 'LEVEL 9 — GRAPHS',
    whatIsIt: 'A Graph is a network consisting of Vertices (nodes) connected by Edges (lines). Graphs model complex real-world connections like social networks, road maps, and web pages.',
    realLifeExample: {
      analogy: 'Social media friendship connections.',
      details: 'Users are vertices (nodes) and friendship connections are edges! BFS explores immediate 1st-degree friends first before moving to 2nd-degree friends.',
    },
    cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int V = 4; // 4 Vertices
    vector<vector<int>> adj(V);
    
    // Add edges (undirected graph)
    adj[0].push_back(1); adj[1].push_back(0); // Edge 0 - 1
    adj[1].push_back(2); adj[2].push_back(1); // Edge 1 - 2
    adj[2].push_back(3); adj[3].push_back(2); // Edge 2 - 3
    
    cout << "Node 1 is connected to: ";
    for(int neighbor : adj[1]) cout << neighbor << " ";
    cout << endl;
    return 0;
}`,
    codeLines: [
      { lineNum: 7, code: 'vector<vector<int>> adj(V);', explanation: 'Creates an Adjacency List array storing neighbor lists for each vertex.' },
      { lineNum: 10, code: 'adj[0].push_back(1);', explanation: 'Adds an edge between vertex 0 and vertex 1.' },
    ],
    expectedOutput: `Node 1 is connected to: 0 2`,
    visualizationType: 'graph',
    miniGameId: 'graph',
    miniGameTitle: 'Graph Pathfinder Game',
  },
};
