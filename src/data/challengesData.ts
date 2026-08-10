import { CodingChallenge } from '../types';

export const CODING_CHALLENGES: CodingChallenge[] = [
  {
    id: 'challenge_max_element',
    topicId: 'arrays',
    title: 'Find Maximum Element in Array',
    difficulty: 'Easy',
    xpReward: 100,
    problemStatement: 'Given an array of integers `arr` of size `n`, write a C++ program to find and return the largest (maximum) element in the array.',
    inputFormat: 'First line contains integer n. Second line contains n space-separated integers.',
    outputFormat: 'Print a single integer representing the maximum value.',
    exampleInput: '5\n10 45 2 99 18',
    exampleOutput: '99',
    expectedApproach: 'Initialize a variable `maxVal` with `arr[0]`. Loop through the array from index 1 to `n-1`. If `arr[i] > maxVal`, update `maxVal = arr[i]`.',
    starterCppCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int findMax(const vector<int>& arr) {
    // Write your solution here
    int maxVal = arr[0];
    
    return maxVal;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for(int i = 0; i < n; i++) cin >> arr[i];
    
    cout << findMax(arr) << endl;
    return 0;
}`,
    solutionCppCode: `#include <iostream>
#include <vector>
using namespace std;

int findMax(const vector<int>& arr) {
    int maxVal = arr[0];
    for (size_t i = 1; i < arr.size(); i++) {
        if (arr[i] > maxVal) {
            maxVal = arr[i];
        }
    }
    return maxVal;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for(int i = 0; i < n; i++) cin >> arr[i];
    cout << findMax(arr) << endl;
    return 0;
}`,
    testCases: [
      { input: '5\n10 45 2 99 18', expectedOutput: '99' },
      { input: '4\n-5 -12 -1 -30', expectedOutput: '-1' },
      { input: '1\n42', expectedOutput: '42' },
      { input: '6\n100 100 50 20 100 10', expectedOutput: '100', isSecret: true },
    ],
    hints: [
      'Think about keeping track of the largest value you have seen so far as you look at each number.',
      'Initialize a variable `maxVal = arr[0]`. Then run a loop for `i = 1` up to `n - 1`.',
      'Inside the loop, compare `if (arr[i] > maxVal) { maxVal = arr[i]; }`. After the loop, return `maxVal`.',
    ],
  },

  {
    id: 'challenge_reverse_array',
    topicId: 'arrays',
    title: 'Reverse an Array (Daily Challenge)',
    difficulty: 'Easy',
    xpReward: 100,
    problemStatement: 'Given an array of integers of size `n`, reverse the elements of the array in-place and print the reversed array.',
    inputFormat: 'First line contains integer n. Second line contains n integers.',
    outputFormat: 'Print the reversed array elements separated by spaces.',
    exampleInput: '5\n1 2 3 4 5',
    exampleOutput: '5 4 3 2 1',
    expectedApproach: 'Use Two Pointer technique! Set `start = 0` and `end = n - 1`. While `start < end`, swap `arr[start]` and `arr[end]`, then increment `start` and decrement `end`.',
    starterCppCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void reverseArray(vector<int>& arr) {
    // Write your code here using two pointers or swap
    int start = 0;
    int end = arr.size() - 1;
    
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for(int i = 0; i < n; i++) cin >> arr[i];
    
    reverseArray(arr);
    
    for(int i = 0; i < n; i++) cout << arr[i] << (i == n-1 ? "" : " ");
    cout << endl;
    return 0;
}`,
    solutionCppCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void reverseArray(vector<int>& arr) {
    int start = 0;
    int end = arr.size() - 1;
    while (start < end) {
        swap(arr[start], arr[end]);
        start++;
        end--;
    }
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for(int i = 0; i < n; i++) cin >> arr[i];
    reverseArray(arr);
    for(int i = 0; i < n; i++) cout << arr[i] << (i == n-1 ? "" : " ");
    cout << endl;
    return 0;
}`,
    testCases: [
      { input: '5\n1 2 3 4 5', expectedOutput: '5 4 3 2 1' },
      { input: '4\n10 20 30 40', expectedOutput: '40 30 20 10' },
      { input: '1\n7', expectedOutput: '7' },
    ],
    hints: [
      'You can swap elements from the ends moving inwards towards the center.',
      'Set two pointers: `start = 0` and `end = n - 1`. Loop while `start < end`.',
      'Inside the loop, use `swap(arr[start], arr[end]); start++; end--;`.',
    ],
  },

  {
    id: 'challenge_binary_search',
    topicId: 'binary_search',
    title: 'Implement Binary Search',
    difficulty: 'Medium',
    xpReward: 125,
    problemStatement: 'Given a sorted array of `n` integers and a target value, find the 0-based index of the target using Binary Search. If target is not present, return -1.',
    inputFormat: 'Line 1: n and target. Line 2: n sorted integers.',
    outputFormat: 'Return index of target or -1.',
    exampleInput: '5 42\n10 20 30 42 50',
    exampleOutput: '3',
    expectedApproach: 'Set low = 0, high = n - 1. While low <= high, calculate mid = low + (high - low)/2. If arr[mid] == target return mid. Adjust low or high accordingly.',
    starterCppCode: `#include <iostream>
#include <vector>
using namespace std;

int binarySearch(const vector<int>& arr, int target) {
    int low = 0;
    int high = arr.size() - 1;
    
    // Complete the binary search loop
    
    return -1;
}

int main() {
    int n, target;
    if (!(cin >> n >> target)) return 0;
    vector<int> arr(n);
    for(int i = 0; i < n; i++) cin >> arr[i];
    cout << binarySearch(arr, target) << endl;
    return 0;
}`,
    solutionCppCode: `#include <iostream>
#include <vector>
using namespace std;

int binarySearch(const vector<int>& arr, int target) {
    int low = 0;
    int high = arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

int main() {
    int n, target;
    if (!(cin >> n >> target)) return 0;
    vector<int> arr(n);
    for(int i = 0; i < n; i++) cin >> arr[i];
    cout << binarySearch(arr, target) << endl;
    return 0;
}`,
    testCases: [
      { input: '5 42\n10 20 30 42 50', expectedOutput: '3' },
      { input: '6 99\n10 20 30 40 50 60', expectedOutput: '-1' },
      { input: '1 15\n15', expectedOutput: '0' },
    ],
    hints: [
      'Dividing the search space in half requires comparing target with the middle element.',
      'Use `while (low <= high)` and compute `mid = low + (high - low) / 2`.',
      'If `arr[mid] == target`, return `mid`. If `arr[mid] < target`, `low = mid + 1`. Else `high = mid - 1`.',
    ],
  },
];
