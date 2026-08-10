import { QuizData } from '../types';

export const QUIZZES_DATA: Record<string, QuizData> = {
  cpp_basics: {
    topicId: 'cpp_basics',
    topicTitle: 'C++ Basics Quiz',
    questions: [
      {
        id: 'q_cpp1',
        question: 'Which function is the mandatory entry point for every C++ program?',
        type: 'multiple_choice',
        options: ['start()', 'main()', 'init()', 'run()'],
        correctAnswer: 1,
        explanation: 'In C++, execution always begins in the int main() function.',
        hint: 'It shares a name with the "main" menu or central hub of an application.',
      },
      {
        id: 'q_cpp2',
        question: 'What does the line `using namespace std;` do in C++?',
        type: 'multiple_choice',
        options: [
          'It imports standard C++ graphics libraries.',
          'It allows using standard components like cout without writing std:: prefix every time.',
          'It compiles the program faster.',
          'It turns off C++ compiler warnings.'
        ],
        correctAnswer: 1,
        explanation: '`using namespace std;` brings standard identifiers like cout and endl into the global scope.',
        hint: 'Think about saving keystrokes when printing output with cout.',
      },
      {
        id: 'q_cpp3',
        question: 'True or False: Every C++ statement must end with a semicolon (;).',
        type: 'true_false',
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation: 'Semicolons tell the C++ compiler where a statement terminates.',
        hint: 'Think of semicolons as periods at the end of sentences in English.',
      },
      {
        id: 'q_cpp4',
        question: 'Predict the output of: `cout << 5 + 3 * 2;`',
        type: 'predict_output',
        options: ['16', '11', '10', '25'],
        correctAnswer: 1,
        explanation: 'Multiplication (*) has higher precedence than addition (+), so 3 * 2 = 6, then 5 + 6 = 11.',
        hint: 'Remember PEMDAS / BODMAS operator precedence rules!',
      },
      {
        id: 'q_cpp5',
        question: 'Find the bug in this line: `cout << "Hello World" << endl`',
        type: 'find_bug',
        options: [
          'Missing semicolon (;) at the end.',
          'cout should be capitalized as Cout.',
          'endl should be in double quotes.',
          'There is no bug.'
        ],
        correctAnswer: 0,
        explanation: 'The statement is missing a closing semicolon `;` at the end.',
        hint: 'Look closely at the very end of the statement.',
      },
    ],
  },

  time_complexity: {
    topicId: 'time_complexity',
    topicTitle: 'Time Complexity Quiz',
    questions: [
      {
        id: 'q_tc1',
        question: 'What does Big O notation measure in computer science?',
        type: 'multiple_choice',
        options: [
          'The exact time in milliseconds on a specific laptop.',
          'The worst-case growth rate of operations as input size N grows.',
          'The lines of code in a file.',
          'The memory size of the C++ executable file.'
        ],
        correctAnswer: 1,
        explanation: 'Big O characterizes the upper bound execution complexity relative to input size N.',
        hint: 'It measures how work scales as input size increases.',
      },
      {
        id: 'q_tc2',
        question: 'Which time complexity is the FASTEST as input N becomes millions?',
        type: 'multiple_choice',
        options: ['O(N²)', 'O(N)', 'O(log N)', 'O(1)'],
        correctAnswer: 3,
        explanation: 'O(1) is constant time! It takes the exact same number of operations regardless of how huge N is.',
        hint: 'Constant time takes 1 step regardless of input size.',
      },
      {
        id: 'q_tc3',
        question: 'A loop runs from i = 0 to N. Inside, a nested loop runs from j = 0 to N. What is the time complexity?',
        type: 'multiple_choice',
        options: ['O(N)', 'O(2N)', 'O(N²)', 'O(N log N)'],
        correctAnswer: 2,
        explanation: 'Nested loops running N times each execute N * N = N² total operations.',
        hint: 'For every step of the outer loop, the inner loop runs N times.',
      },
      {
        id: 'q_tc4',
        question: 'True or False: O(2N) simplifies to O(N) in Big O notation.',
        type: 'true_false',
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation: 'In Big O notation, constant coefficients (like 2) are dropped because growth rate dominates.',
        hint: 'Constants are dropped when expressing asymptotic growth.',
      },
      {
        id: 'q_tc5',
        question: 'If an algorithm cuts the remaining search space in half at every single step, what is its time complexity?',
        type: 'multiple_choice',
        options: ['O(N)', 'O(log N)', 'O(N²)', 'O(1)'],
        correctAnswer: 1,
        explanation: 'Repeatedly dividing input size in half results in logarithmic time O(log N).',
        hint: 'Think about binary search halving the search space.',
      },
    ],
  },

  arrays: {
    topicId: 'arrays',
    topicTitle: 'Arrays Quiz',
    questions: [
      {
        id: 'q_arr1',
        question: 'In C++, what is the index of the first element in an array `int arr[10]`?',
        type: 'multiple_choice',
        options: ['1', '0', '-1', '10'],
        correctAnswer: 1,
        explanation: 'C++ uses 0-based indexing, so the first element is always at index 0.',
        hint: 'Computer memory addresses count offset starting from 0.',
      },
      {
        id: 'q_arr2',
        question: 'What is the time complexity to access an array element by index, e.g. `arr[4]`?',
        type: 'multiple_choice',
        options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'],
        correctAnswer: 0,
        explanation: 'Since array memory is contiguous, the computer calculates memory address instantly in O(1) time.',
        hint: 'Direct memory index lookup requires no loop search.',
      },
      {
        id: 'q_arr3',
        question: 'What happens if you try to access `arr[10]` on an array declared as `int arr[5]` in C++?',
        type: 'multiple_choice',
        options: [
          'It automatically resizes the array.',
          'It throws a syntax error at compile time.',
          'It causes Undefined Behavior / Out of Bounds memory access.',
          'It returns 0.'
        ],
        correctAnswer: 2,
        explanation: 'C++ does not perform automatic runtime bound checks on primitive arrays, causing undefined behavior or crashes.',
        hint: 'Accessing memory outside allocated bounds is dangerous in C++.',
      },
      {
        id: 'q_arr4',
        question: 'True or False: Primitive C++ arrays can hold elements of different data types (e.g., ints and strings mixed together).',
        type: 'true_false',
        options: ['True', 'False'],
        correctAnswer: 1,
        explanation: 'Arrays in C++ are homogeneous and can only store elements of the same data type.',
        hint: 'All memory slots in an array must be the exact same type and size.',
      },
      {
        id: 'q_arr5',
        question: 'Predict the output: `int arr[3] = {5, 10, 15}; cout << arr[1] + arr[2];`',
        type: 'predict_output',
        options: ['15', '25', '20', '30'],
        correctAnswer: 1,
        explanation: 'arr[1] is 10 and arr[2] is 15. 10 + 15 = 25.',
        hint: 'Remember arr[0] = 5, arr[1] = 10, arr[2] = 15.',
      },
    ],
  },

  binary_search: {
    topicId: 'binary_search',
    topicTitle: 'Binary Search Quiz',
    questions: [
      {
        id: 'q_bs1',
        question: 'What MANDATORY condition must an array meet before applying Binary Search?',
        type: 'multiple_choice',
        options: [
          'The array must contain only positive numbers.',
          'The array must be SORTED in ascending or descending order.',
          'The array size must be an even number.',
          'The array must fit in cache memory.'
        ],
        correctAnswer: 1,
        explanation: 'Binary search relies on order to know whether target lies in left or right half.',
        hint: 'Can you eliminate half if numbers are scattered randomly?',
      },
      {
        id: 'q_bs2',
        question: 'What is the worst-case time complexity of Binary Search on an array of size N?',
        type: 'multiple_choice',
        options: ['O(N)', 'O(1)', 'O(log N)', 'O(N²)'],
        correctAnswer: 2,
        explanation: 'Dividing N by 2 at each step takes log2(N) steps.',
        hint: 'Think about cutting search space in half repeatedly.',
      },
      {
        id: 'q_bs3',
        question: 'If target is LESS than arr[mid], which way do you move your search pointers?',
        type: 'multiple_choice',
        options: [
          'low = mid + 1',
          'high = mid - 1',
          'low = mid - 1',
          'high = mid + 1'
        ],
        correctAnswer: 1,
        explanation: 'If target < arr[mid], target must be in the left half, so pull high pointer to mid - 1.',
        hint: 'Left side contains smaller values.',
      },
      {
        id: 'q_bs4',
        question: 'On an array of 1,024 sorted elements, what is the maximum number of comparisons Binary Search takes?',
        type: 'multiple_choice',
        options: ['1024', '512', '10', '100'],
        correctAnswer: 2,
        explanation: 'log2(1024) = 10. It takes at most 10 comparisons!',
        hint: '2^10 = 1024.',
      },
      {
        id: 'q_bs5',
        question: 'Why do we write `mid = low + (high - low) / 2` instead of `mid = (low + high) / 2` in C++?',
        type: 'multiple_choice',
        options: [
          'It looks cooler.',
          'It prevents integer overflow when low + high exceeds INT_MAX.',
          'It executes faster on CPU.',
          'Both formulas behave identically with zero difference.'
        ],
        correctAnswer: 1,
        explanation: 'If low and high are huge numbers, adding low + high could exceed integer capacity and overflow into negative numbers.',
        hint: 'Think about integer capacity limits.',
      },
    ],
  },

  stack: {
    topicId: 'stack',
    topicTitle: 'Stack & LIFO Quiz',
    questions: [
      {
        id: 'q_st1',
        question: 'Which acronym best describes the behavior of a Stack?',
        type: 'multiple_choice',
        options: ['FIFO', 'LIFO', 'LILO', 'FILO'],
        correctAnswer: 1,
        explanation: 'LIFO stands for Last In, First Out.',
        hint: 'The LAST item added is the FIRST item removed.',
      },
      {
        id: 'q_st2',
        question: 'What does the stack operation `push(x)` do?',
        type: 'multiple_choice',
        options: [
          'Removes the top element.',
          'Adds element x to the top of the stack.',
          'Returns the bottom element.',
          'Clears the entire stack.'
        ],
        correctAnswer: 1,
        explanation: 'push(x) places a new item x onto the top of the stack.',
        hint: 'Think of pushing a new plate onto the stack.',
      },
      {
        id: 'q_st3',
        question: 'Which real-world feature relies heavily on a Stack data structure?',
        type: 'multiple_choice',
        options: [
          'Browser Back / Forward button history',
          'Printer print queue',
          'Traffic light system',
          'Grocery store checkout line'
        ],
        correctAnswer: 0,
        explanation: 'Browsers use a stack for web page navigation history: pushing visited pages and popping when you click Back.',
        hint: 'Going "Back" reverses your last visited page.',
      },
      {
        id: 'q_st4',
        question: 'What is the time complexity of push and pop operations on a Stack?',
        type: 'multiple_choice',
        options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'],
        correctAnswer: 0,
        explanation: 'Adding or removing the top element takes instant O(1) constant time.',
        hint: 'No elements need to be shifted in memory.',
      },
      {
        id: 'q_st5',
        question: 'What error occurs if you call `pop()` on an EMPTY stack?',
        type: 'multiple_choice',
        options: ['Stack Overflow', 'Stack Underflow', 'Null Memory Fault', 'Segmentation Check'],
        correctAnswer: 1,
        explanation: 'Attempting to pop from an empty stack causes a Stack Underflow error.',
        hint: 'Underflow means popping when there is nothing underneath.',
      },
    ],
  },
};
